import React, { useState, useEffect } from "react";
import "./Store.css";
import Card from "../Card/Card";

// Importações do banner que estavam em falta
import banner1 from "./assets/b1.png";
import banner2 from "./assets/b2.png";
import banner3 from "./assets/b3.png";
const bannerImages = [banner1, banner2, banner3];

const Store = ({
  cart,
  onAddToCart,
  onOpenRemovalModal,
  selectedAttributes,
  selectedTypes,
}) => {
  // Constantes
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Funções
  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      setError(null);
      try {
        const offset = (currentPage - 1) * itemsPerPage;
        let apiUrl = `https://db.ygoprodeck.com/api/v7/cardinfo.php?num=${itemsPerPage}&offset=${offset}`;

        if (selectedAttributes.length > 0) {
          apiUrl += `&attribute=${selectedAttributes.join(",")}`;
        }
        if (selectedTypes.length > 0) {
          apiUrl += `&type=${selectedTypes
            .map((t) => encodeURIComponent(t))
            .join(",")}`;
        }

        const response = await fetch(apiUrl);
        if (!response.ok) {
          const errorData = await response.json();
          if (
            errorData.error &&
            errorData.error.includes("No card matching your query was found")
          ) {
            setCards([]);
            setTotalPages(0);
          } else {
            throw new Error("A resposta da rede não foi bem-sucedida");
          }
        } else {
          const data = await response.json();
          setCards(data.data);
          if (data.meta.total_pages) {
            setTotalPages(data.meta.total_pages);
          } else {
            setTotalPages(currentPage + data.meta.pages_remaining);
          }
        }
      } catch (error) {
        setCards([]);
        setTotalPages(0);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [currentPage, itemsPerPage, selectedAttributes, selectedTypes]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedAttributes, selectedTypes]);

  // Banner rotativo 8s
  const [currentBanner, setCurrentBanner] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handleDotClick = (index) => {
    setCurrentBanner(index);
  };

  // Itens por página
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage, endPage;

    if (totalPages <= maxPagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const maxPagesBeforeCurrentPage = Math.floor(maxPagesToShow / 2);
      const maxPagesAfterCurrentPage = Math.ceil(maxPagesToShow / 2) - 1;
      if (currentPage <= maxPagesBeforeCurrentPage) {
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        startPage = totalPages - maxPagesToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <div
          key={i}
          className={`page-number ${currentPage === i ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </div>
      );
    }
    return pageNumbers;
  };

  const PaginationComponent = () =>
    !loading &&
    totalPages > 1 && (
      <div className="pagination-controls">
        <div
          className="page-arrow"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          &lt;
        </div>
        {renderPageNumbers()}
        <div
          className="page-arrow"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          &gt;
        </div>
      </div>
    );

  return (
    <div className="conteudo-direita">
      <div className="banner-wrapper">
        <section className="banner">
          <div
            className="slider"
            style={{ transform: `translateX(-${currentBanner * 100}%)` }}
          >
            {bannerImages.map((image, index) => (
              <div key={index} className="slide">
                <img src={image} alt={`Banner ${index + 1}`} />
              </div>
            ))}
          </div>
        </section>
        <div className="dots-container">
          {bannerImages.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === currentBanner ? "active" : ""}`}
              onClick={() => handleDotClick(index)}
            ></div>
          ))}
        </div>
      </div>

      <div className="store-controls">
        <div className="items-per-page-selector">
          <label htmlFor="items-per-page">Itens por página: </label>
          <select
            id="items-per-page"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <div className="pagination-wrapper">
          <PaginationComponent />
        </div>
      </div>

      <main className="store-items">
        {loading && <p>Carregando cartas</p>}
        {error && <p>Erro ao carregar as cartas : {error}</p>}
        {!loading && !error && cards.length > 0
          ? cards.map((card) => (
              <Card
                key={card.id}
                cardData={card}
                cart={cart}
                onAddToCart={onAddToCart}
                onOpenRemovalModal={onOpenRemovalModal}
              />
            ))
          : !loading && (
              <p>Nenhuma carta encontrada com os filtros selecionados.</p>
            )}
      </main>
    </div>
  );
};

export default Store;
