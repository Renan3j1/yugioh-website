import React from "react";
import "./Filters.css";

const Filters = ({
  selectedAttributes,
  handleAttributeChange,
  selectedTypes,
  handleTypeChange,
}) => {
  const attributes = [
    "DARK",
    "DIVINE",
    "EARTH",
    "FIRE",
    "LIGHT",
    "WATER",
    "WIND",
  ];
  const cardTypes = [
    "Effect Monster",
    "Flip Effect Monster",
    "Flip Tuner Effect Monster",
    "Gemini Monster",
    "Normal Monster",
    "Normal Tuner Monster",
    "Pendulum Effect Monster",
    "Pendulum Flip Effect Monster",
    "Pendulum Normal Monster",
    "Pendulum Tuner Effect Monster",
    "Ritual Effect Monster",
    "Ritual Monster",
    "Skill Card",
    "Spell Card",
    "Spirit Monster",
    "Toon Monster",
    "Trap Card",
    "Tuner Monster",
    "Union Effect Monster",
    "Fusion Monster",
    "Link Monster",
    "Pendulum Effect Fusion Monster",
    "Synchro Monster",
    "Synchro Pendulum Effect Monster",
    "Synchro Tuner Monster",
    "XYZ Monster",
    "XYZ Pendulum Effect Monster",
  ];

  return (
    <aside className="filters">
      <h3>FILTROS</h3>
      <div className="filter-group">
        <h4>Atributo:</h4>
        <div className="checkbox-container">
          {attributes.map((attr) => (
            <div key={attr} className="checkbox-item">
              <input
                type="checkbox"
                id={`attr-${attr}`}
                value={attr}
                checked={selectedAttributes.includes(attr)}
                onChange={() => handleAttributeChange(attr)}
              />
              <label htmlFor={`attr-${attr}`}>{attr}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4>Tipo de Carta:</h4>
        <div className="checkbox-container">
          {cardTypes.map((type) => (
            <div key={type} className="checkbox-item">
              <input
                type="checkbox"
                id={`type-${type}`}
                value={type}
                checked={selectedTypes.includes(type)}
                onChange={() => handleTypeChange(type)}
              />
              <label htmlFor={`type-${type}`}>{type}</label>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Filters;
