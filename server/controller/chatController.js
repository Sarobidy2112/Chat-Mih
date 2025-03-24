import dotenv from 'dotenv';
import Groq from 'groq-sdk';
import { marked } from 'marked';


dotenv.config();
const groq = new Groq({ apiKey: process.env.API_KEY });

// Modèles Groq pour chaque caractéristique
const MODELS = {
  Texte: "llama-3.3-70b-versatile",
  Raisonnement: "deepseek-r1-distill-llama-70b",
  Vision: "vision-model" // Remplacez par le modèle approprié si disponible
};

// Message système par défaut
const SYSTEM_MESSAGE = {
  role: "system",
  content: "Tu es un assistant amical et serviable qui répond de manière claire et concise. Tu fournis des informations précises et tu aides l'utilisateur à résoudre ses problèmes."
};

// Fonction pour transformer la réponse en HTML formaté
const formatResponse = (text) => {
  return marked(text); // Convertit le Markdown en HTML
};

// Fonction pour créer une complétion de chat
const createChatCompletion = async (model, userMessage) => {
  const chatCompletion = await groq.chat.completions.create({
    messages: [SYSTEM_MESSAGE, { role: "user", content: userMessage }],
    model,
    temperature: 0.5,
    max_tokens: 1024,
    top_p: 1,
    stream: false,
    stop: null,
    ...(model === "deepseek-r1-distill-llama-70b" ? { reasoning_format: "raw" } : {})
  });
  
  let responseText = chatCompletion.choices?.[0]?.message?.content || "Aucune réponse reçue.";
  
  if (model === "deepseek-r1-distill-llama-70b") {
    responseText = responseText.split('</think>').pop().trim();
  }
  
  return formatResponse(responseText);
};

const chat = async (req, res) => {
  const { userMessage, modelFeature = "Texte" } = req.body; // Par défaut, "Texte" est utilisé

  // Validation des entrées
  if (!userMessage) {
    return res.status(400).json({ error: "Veuillez entrer un message ou ajouter une image." });
  }

  if (!MODELS[modelFeature]) {
    return res.status(400).json({ error: "Caractéristique du modèle invalide." });
  }

  try {
    let response;

    switch (modelFeature) {
      case "Raisonnement":
      case "Texte":
        response = await createChatCompletion(MODELS[modelFeature], userMessage);
        break;

      case "Vision":
        console.log("Réponse basée sur la vision ...");
        response = "Réponse basée sur la vision ..."; // Remplacez par la logique appropriée
        break;

      default:
        response = "Caractéristique du modèle non prise en charge.";
    }

    res.json({ response });

  } catch (error) {
    console.error('❌ Erreur lors de la complétion de chat:', error);

    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      res.status(500).json({ error: 'Erreur interne du serveur. Veuillez réessayer plus tard.' });
    }
  }
};

export default chat;