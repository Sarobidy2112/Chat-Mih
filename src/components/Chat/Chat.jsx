import React, { useState, useEffect } from 'react';
import './style.css';

const Chat = ({ modelFeature }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [longueur, setLongueur] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const afficherMessages = () => {
    const blockTitle = document.querySelector('.block-title');
    const listMessageReponse = document.querySelector('.list-message-reponse');
    if (messages.length === 0) {
      blockTitle.style.display = 'flex';
      listMessageReponse.innerHTML = '';
    } else {
      blockTitle.style.display = 'none';
    }
  };

  const ajouterMessage = async () => {
    if (inputMessage.trim() === '') return;

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3030/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userMessage: inputMessage,
          modelFeature: modelFeature || "Texte", // Utiliser la caractéristique du modèle
        }),
      });

      const data = await response.json();

      if (data.response) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { message: inputMessage, response: data.response },
        ]);
        setLongueur((prevLongueur) => prevLongueur + 1);
        setInputMessage('');
      } else {
        console.error('Réponse invalide de l\'API:', data);
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
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
            <div className="reponse-message" dangerouslySetInnerHTML={{ __html: msg.response }}></div>

          </div>
        ))}
        {isLoading && (
          <div className="loading-indicator">
            <p>Loading...</p>
          </div>
        )}
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
};

export default Chat;