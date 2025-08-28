import React, { useState } from "react";
import "./CartPage.css";

const CartPage = ({ cart, onRemoveFromCart, onUpdateQuantity }) => {
  const [shippingCost, setShippingCost] = useState(20.0);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + shippingCost;

  return (
    <div className="cart-page-container">
      <h2 className="cart-page-title">CARRINHO DE COMPRAS</h2>
      <div className="cart-page-content">
        <div className="cart-items-section">
          {cart.length === 0 ? (
            <p>O seu carrinho está vazio.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item-row">
                <img
                  src={item.card_images[0].image_url_small}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p>{item.desc}</p>
                  <span>
                    Preço por unidade:{" "}
                    <strong>
                      R$ {item.price.toFixed(2).replace(".", ",")}
                    </strong>
                  </span>
                </div>
                <div className="cart-item-quantity">
                  <label>Quantidade:</label>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      onUpdateQuantity(item.id, parseInt(e.target.value))
                    }
                  />
                </div>
                <div className="cart-item-total">
                  <span>Total:</span>
                  <strong>
                    R${" "}
                    {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                  </strong>
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => onRemoveFromCart(item.id)}
                >
                  X
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cart-summary-section">
          <div className="shipping-options">
            <h4>Formas de envio</h4>
            <div className="shipping-option">
              <input
                type="radio"
                id="fast-shipping"
                name="shipping"
                defaultChecked
              />
              <label htmlFor="fast-shipping">
                Frete Fixo com rastreio (R$ 20,00)
              </label>
            </div>
          </div>

          <div className="purchase-summary">
            <h4>Resumo da compra</h4>
            <div className="summary-row">
              <span>Total das cartas:</span>
              <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
            </div>
            <div className="summary-row">
              <span>Valor do frete:</span>
              <span>R$ {shippingCost.toFixed(2).replace(".", ",")}</span>
            </div>
            <div className="summary-row total">
              <span>TOTAL A PAGAR: </span>
              <span> R$ {total.toFixed(2).replace(".", ",")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
