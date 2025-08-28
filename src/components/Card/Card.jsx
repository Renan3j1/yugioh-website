import React, { useState } from "react";
import "./Card.css";

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substr(0, maxLength) + "...";
};

const Card = ({ cardData, cart, onAddToCart }) => {
  const [price] = useState((Math.random() * 99 + 1).toFixed(2));
  const isAdded = cart.some((item) => item.id === cardData.id);

  const imageUrl = cardData.card_images[0].image_url;

  const handleClick = () => {
    onAddToCart(cardData, price);
  };

  return (
    <div className="card-item">
      <div className="card-image-container">
        <img src={imageUrl} alt={cardData.name} className="card-image" />
      </div>
      <div className="card-content">
        <h3 className="card-name">{cardData.name}</h3>
        <div className="card-details">
          <span className="card-type">{cardData.type}</span>
          {cardData.attribute && (
            <span className="card-attribute">{cardData.attribute}</span>
          )}
        </div>
        <p className="card-description">{truncateText(cardData.desc, 80)}</p>
        <div className="card-footer">
          <span className="card-price">R$ {price.replace(".", ",")}</span>
          <button
            className={`add-to-cart-btn ${isAdded ? "added" : ""}`}
            onClick={handleClick}
          >
            {isAdded ? "Adicionado" : "Adicionar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
