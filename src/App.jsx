import React, { useState } from "react";
import "./App.css";

import Header from "./components/Header/Header";
import Filters from "./components/Filters/Filters";
import Store from "./components/Store/Store";
import Notification from "./components/Notification/Notification";
import RemovalModal from "./components/RemovalModal/RemovalModal";
import CartPage from "./components/CartPage/CartPage";

function App() {
  // CONSTANTES
  const [cart, setCart] = useState([]); // Itens carrinho
  const [selectedAttributes, setSelectedAttributes] = useState([]); // Atributos
  const [selectedTypes, setSelectedTypes] = useState([]); // Filtros
  const [notification, setNotification] = useState(null); // Notificações
  const [removalCandidate, setRemovalCandidate] = useState(null); // Remover item
  const [isCartOpen, setIsCartOpen] = useState(false); // Carrinho aberto?

  // Funções de carrinho e filtro
  const handleAddToCart = (card, price) => {
    const existingItem = cart.find((item) => item.id === card.id);
    if (existingItem) {
      // Se o item já existe, apenas aumenta a quantidade
      handleUpdateQuantity(card.id, existingItem.quantity + 1);
    } else {
      // Senão, adiciona o novo item com quantidade 1
      const newItem = { ...card, price: parseFloat(price), quantity: 1 };
      setCart((prevCart) => [...prevCart, newItem]);
    }
    setNotification({
      productName: `"${card.name}"`,
    });
  };

  const handleRemoveFromCart = (cardId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== cardId));
    setRemovalCandidate(null);
  };

  const handleUpdateQuantity = (cardId, quantity) => {
    if (quantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === cardId ? { ...item, quantity: quantity } : item
      )
    );
  };

  const handleToggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  const handleOpenRemovalModal = (card) => {
    setRemovalCandidate(card);
  };

  const handleAttributeChange = (attribute) => {
    setSelectedAttributes((prev) =>
      prev.includes(attribute)
        ? prev.filter((a) => a !== attribute)
        : [...prev, attribute]
    );
  };

  const handleTypeChange = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleClearFilters = () => {
    setSelectedAttributes([]);
    setSelectedTypes([]);
  };

  return (
    <div className="App">
      <Header cart={cart} onCartClick={handleToggleCart} />
      <Notification
        notification={notification}
        onClose={handleCloseNotification}
      />
      <RemovalModal
        candidate={removalCandidate}
        onClose={() => setRemovalCandidate(null)}
        onRemove={handleRemoveFromCart}
      />
      {/* Condicional de loja ou carrinho */}
      {isCartOpen ? (
        <CartPage
          cart={cart}
          onRemoveFromCart={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
        />
      ) : (
        <div className="container-principal">
          <Filters
            selectedAttributes={selectedAttributes}
            handleAttributeChange={handleAttributeChange}
            selectedTypes={selectedTypes}
            handleTypeChange={handleTypeChange}
            handleClearFilters={handleClearFilters}
          />
          <Store
            cart={cart}
            onAddToCart={handleAddToCart}
            onOpenRemovalModal={handleOpenRemovalModal}
            selectedAttributes={selectedAttributes}
            selectedTypes={selectedTypes}
          />
        </div>
      )}
      <footer className="bg-black p-5 ">
        <h1 className="text-white text-center">TODOS DIREITOS RESERVADOS</h1>
      </footer>
    </div>
  );
}

export default App;
