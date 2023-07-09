import React, { useState, useEffect } from "react";
import { updatedProductCart, handleRemoveFromCart } from '../axios-services'

const UpdateQty = (props) => {
  const { product, user, sessionId, fetchProductsCart, setProducts } = props;

  const [cartQuantity, setCartQuantity] = useState(product.cartquantity);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setCartQuantity(product.cartquantity);
  }, [product.cartquantity]);

  const handleQuantity = async (quantity) => {
    const updatedQuantity = product.cartquantity + quantity;
    const updatedTotalPrice = product.cartprodprice * updatedQuantity;
    try {
      await updatedProductCart(product.cartid, product.cartprodid, updatedQuantity, updatedTotalPrice);
      const products = await fetchProductsCart(user?.id || null, sessionId);
      setProducts(products);
    } catch (error) {
      console.error(error);
    }

    if (updatedQuantity < 1) {
      await handleRemoveFromCart(product.cartid, product.cartprodid);
      const products = await fetchProductsCart(user?.id || null, sessionId);
      setProducts(products);
    } 
  }

  return (
    <>
      <div className="quantity-container">
        <button className="quantity-button" onClick={() => handleQuantity(-1)}>-</button>
        <span className="quantity-display">Qty: {cartQuantity}</span>
        <button className="quantity-button" onClick={() => handleQuantity(1)}>+</button>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
};

export default UpdateQty;