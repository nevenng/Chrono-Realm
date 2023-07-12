import React, { useEffect, useState } from "react";
import { CartItem, CheckoutButton } from "../components";
import { fetchProductsCart } from "../axios-services";
import { useHistory } from "react-router-dom";

const CartSummary = (props) => {
  const { user, sessionId } = props;
  const [products, setProducts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function fetchCartData() {
      try {
        const response = await fetchProductsCart(user?.id || null, sessionId);
        setProducts(response.map((product, index) => ({ ...product, order: index })));
      } catch (error) {
        console.error(error);
      }
    }

    const timer = setTimeout(() => {
      fetchCartData();
    }, 100);

    return () => clearTimeout(timer);
  }, [user, sessionId]);

  const handleViewProducts = () => {
    history.push("/products");
  };

  const handleClearCart = () => {
    setProducts([]);
  };

  return (
    <>
      <div className="cart-container">
        <h3>Your Cart</h3>
        {products.length > 0 ? (
          <table className="cart-table">
            <thead>
              <tr className="cart-table-header">
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <CartItem
                  key={product.cartprodid}
                  product={product}
                  user={user}
                  sessionId={sessionId}
                  fetchProductsCart={fetchProductsCart}
                  setProducts={setProducts}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <p className="empty-cart-message">Your cart is empty.</p>
        )}
      </div>
      <div className="cart-action-buttons">
        <button className="view-products-button" onClick={handleViewProducts}>
          {products.length > 0 ? "Continue Shopping" : "Shop All Products"}
        </button>
        {products.length > 0 && (
          <div>
            <CheckoutButton product={products} setProducts={handleClearCart} user={user} sessionId={sessionId} />
          </div>
        )}
      </div>
    </>
  );
};

export default CartSummary;
