import dotenv from 'dotenv';
import Groq from 'groq-sdk';

dotenv.config();
const groq = new Groq({ apiKey: process.env.API_KEY });

const chat = async (req, res) => {
    const { userMessage } = req.body;
  
    if (!userMessage) {
      return res.status(400).json({ error: "Veuillez entrer un message ou ajouter une image." });
    }
  
    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "Tu es un assistant amical et serviable qui répond de manière claire et concise. Tu fournis des informations précises et tu aides l'utilisateur à résoudre ses problèmes."
          },
          { 
            role: "user", 
            content: userMessage 
          }
        ],
        model: "llama-3.2-11b-vision-preview",
        temperature: 0.5,
        max_tokens: 1024,
        top_p: 1,
        stream: false
      });
  
      const message = chatCompletion.choices?.[0]?.message?.content || "Aucune réponse reçue.";
      res.json({ response: message });
  
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