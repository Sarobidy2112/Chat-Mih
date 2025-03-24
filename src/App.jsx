import React, { useState, useEffect } from 'react';
import Sidebar from './components/sidebar/sidebar';
import './index.css';
import Navbar from './components/Navbar/Navbar';
import Chat from './components/Chat/Chat';
import Prism from 'prismjs'; // Assure-toi d'importer Prism ici
import "prismjs/components/prism-python"; // Import du langage Python
import "prismjs/components/prism-javascript"; // Import du langage JavaScript
import "prismjs/themes/prism-tomorrow.css"; // Import du thème Prism

function App() {
  const [count, setCount] = useState(0);
  const [modelFeature, setModelFeature] = useState("Texte"); // Par défaut, "Texte" est sélectionné

  useEffect(() => {
    Prism.highlightAll(); // Appel à Prism pour mettre en surbrillance tout le code
  }, []);

  return (
    <div className="bodyContent">
      <Sidebar />
      <div className="pages">
        <Navbar onSelect={(feature) => setModelFeature(feature)} />
        <Chat modelFeature={modelFeature}/>
      </div>
    </div>
  );
}

export default App;
