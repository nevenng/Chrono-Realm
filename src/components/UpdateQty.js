import React, { useState, useEffect } from "react";
import { handleUpdateQty, handleRemoveFromCart } from '../axios-services';

const UpdateQty = () => {
  // { userToken, cartProdId, cartQuantity }
  const [ cartQuantity, setCartQuantity ] = useState(1);
  const userToken = true; 
  const cartProdId = 1;
  // Used ^^^ to test 
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setCartQuantity(cartQuantity);
  }, [cartQuantity]);

  const handleQuantityChange = (amount) => {
    const updatedQuantity = cartQuantity + amount;

    if (updatedQuantity < 1) {
      removeProductFromCart();
    } else {
      setErrorMessage("");
      setCartQuantity(updatedQuantity);
      updateQty(updatedQuantity);
    }
  };

  const removeProductFromCart = async () => {
    try {
      await handleRemoveFromCart(userToken, cartProdId);
      alert('Product has been removed from your cart!');
    } catch (err) {
      console.error(err);
    }
  };

  const updateQty = async (updatedQuantity) => {
    try {
      await handleUpdateQty(userToken, cartProdId, updatedQuantity);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="quantity-container">
        <button className="quantity-button" onClick={() => handleQuantityChange(-1)}>-</button>
        <span className="quantity-display">Qty: {cartQuantity}</span>
        <button className="quantity-button" onClick={() => handleQuantityChange(1)}>+</button>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
};

export default UpdateQty;