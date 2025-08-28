import React from "react";
import "./Header.css";

const Header = ({ cart, onCartClick }) => {
  // Constantes de carrinho
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <header className="header">
      <div className="logo">
        <h1 className="text-5xl font-bold text-orange-500 font-nunito">
          YU-GI-OH
        </h1>
      </div>
      <div className="search-container">
        <input type="text" placeholder="Buscar carta" className="search-bar" />
      </div>
      <div className="cart-container" onClick={onCartClick}>
        <div className="cart-info">
          <span>{totalItems} itens</span>
          <span>R$ {totalPrice.toFixed(2).replace(".", ",")}</span>
        </div>
        <div className="cart-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;
