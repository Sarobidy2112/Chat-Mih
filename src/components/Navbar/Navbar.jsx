import React, { useState } from "react";
import "./style.css";

const Navbar = ({ onSelect }) => {
  const [selectedOption, setSelectedOption] = useState("Texte"); // Par défaut, "Texte" est sélectionné

  const handleSelectClick = () => {
    document.querySelector(".select-container").classList.toggle("active");
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option); // Transmettre la valeur sélectionnée au parent
    document.querySelector(".select-container").classList.remove("active");
  };

  return (
    <nav className="navbar">
      <div className="select-container">
        <div className="select" onClick={handleSelectClick}>
          <input
            type="text"
            id="input"
            placeholder="Caractéristique du modèle"
            value={selectedOption}
            readOnly
          />
        </div>
        
        <div className="option-container">
          {["Texte", "Raisonnement", "Vision"].map((option, index) => (
            <div
              key={index}
              className={`option ${selectedOption === option ? "selected" : ""}`}
              onClick={() => handleOptionClick(option)}
            >
              <label>{option}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="btn-login">
        <button>Login</button>
      </div>
    </nav>
  );
};

export default Navbar;