import React, { useState, useEffect } from 'react';
import { fetchAllProducts } from '../axios-services';

const ProductCarousel = (props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);
  const { product } = props;
  const targetBrand = product ? product.brand : null;
  const targetProdId = product ? product.prodid : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await fetchAllProducts();
        const filteredProducts = productsData.filter(
          (product) => product.brand === targetBrand && product.prodid !== targetProdId
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [targetBrand, targetProdId]);

  const nextSlide = () => {
    if (currentSlide < products.length - 1) {
      const nextIndex = currentSlide + 1;
      setCurrentSlide(nextIndex);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      const prevIndex = currentSlide - 1;
      setCurrentSlide(prevIndex);
    }
  };

  const visibleProducts = products.slice(currentSlide, currentSlide + 4);

  if (!product) {
    return null;
  }

  return (
    <div className="product-carousel">
      <div className="product-more-to-explore">
        <h3>More from {product.brand}</h3>
      </div>
      <div className="carousel-content">
        {visibleProducts.map((product, index) => (
          <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
            <div className="carousel-item-img">
              <a href={`/products/${product.prodid}`}>
                <img src={product.prodimg} alt={product.prodmodelname} />
              </a>
            </div>
            <div className="carousel-item-details">
              <h3 className="carousel-item-title">{product.prodmodelname}</h3>
              <p className="carousel-item-price">{product.prodprice}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="carousel-controls">
        <button
          className="carousel-control-btn left-arrow"
          onClick={prevSlide}
          disabled={currentSlide === 0}
        >
          &lt;
        </button>
        <button
          className="carousel-control-btn right-arrow"
          onClick={nextSlide}
          disabled={currentSlide >= products.length - 1}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ProductCarousel;
