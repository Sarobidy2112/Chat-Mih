import React, { useState } from 'react';
import './style.css';

const Chat = () => {
  // États pour gérer les messages et les réponses
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [longueur, setLongueur] = useState(0);

  // Fonction pour générer un mot aléatoire
  function genererMotAleatoire(longueur) {
    const lettres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let mot = '';
    for (let i = 0; i < longueur; i++) {
      mot += lettres.charAt(Math.floor(Math.random() * lettres.length));
    }
    return mot;
  }

  // Fonction pour afficher les messages
  function afficherMessages() {
    const blockTitle = document.querySelector('.block-title');
    const listMessageReponse = document.querySelector('.list-message-reponse');
    
    if (messages.length === 0) {
      blockTitle.style.display = 'flex'; // Afficher le titre
      listMessageReponse.innerHTML = ''; // Effacer les anciens messages
    } else {
      blockTitle.style.display = 'none'; // Cacher le titre
    }
  }

  // Fonction pour ajouter un message
  function ajouterMessage() {
    if (inputMessage.trim() !== '') {
      const newMessage = inputMessage;
      const newResponse = genererMotAleatoire(10);

      // Mettre à jour l'état des messages et réponses
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: newMessage, response: newResponse },
      ]);

      setLongueur(longueur + 1);
      setInputMessage(''); // Vider le champ de saisie après envoi
    }
  }

  // Affichage des messages
  React.useEffect(() => {
    afficherMessages();
  }, [messages]);

  return (
    <div className="chat-content">
      <div className="block-title" style={{ display: messages.length === 0 ? 'flex' : 'none' }}>
        <h1 className="title">Hi ! I'm Chat Mih</h1>
        <h3>How can I help you ?</h3>
      </div>

      <div className="list-message-reponse scrollable">
        {messages.map((msg, index) => (
          <div key={index}>
            <div className="message-send">
              <p>{msg.message}</p>
            </div>
            <div className="reponse-message">
              <p>{msg.response}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="message-input">
        <textarea
          id="message"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Message Chat Mih"
          className="message"
          cols="30"
          rows="4"
        ></textarea>
        <i
          className="fas fa-paper-plane icon-send"
          id="send-message"
          onClick={ajouterMessage}
        ></i>
      </div>
    </div>
  );
}

export default Chat;
