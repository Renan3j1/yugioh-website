import React from "react";
import "./RemovalModal.css";

const RemovalModal = ({ candidate, onClose, onRemove }) => {
  if (!candidate) {
    return null;
  }

  return (
    <div className="removal-overlay">
      <div className="removal-popup">
        <p>
          Produto <strong>"{candidate.name}"</strong> já foi adicionado ao
          carrinho!
        </p>
        <div className="removal-buttons">
          <button
            className="removal-btn btn-delete"
            onClick={() => onRemove(candidate.id)}
          >
            REMOVER
          </button>
          <button className="removal-btn btn-close" onClick={onClose}>
            FECHAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemovalModal;
