import React from "react";
import "./Notification.css";

const Notification = ({ notification, onClose }) => {
  if (!notification) {
    return null;
  }

  return (
    <div className="notification-overlay">
      <div className="notification-popup">
        <p>
          Produto <strong>{notification.productName}</strong> adicionado ao
          carrinho com sucesso!
        </p>
        <button className="close-btn" onClick={onClose}>
          FECHAR
        </button>
      </div>
    </div>
  );
};

export default Notification;
