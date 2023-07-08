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


// import React from "react";
// import { useState } from "react";
// import { handleUpdateQty } from '../axios-services';

// const UpdateQty = () => {
// // Need to pass in userToken and cartProdId, cartQuantity, inventory(from Products)
// // Do we worry about caluculating the price on the back-end? 
//   const [cartQuantity, setCartQuantity] = useState(1);
//   // need to set the cartQuantity to inventory ^^^ when we get the product data
//   const [errorMessage, setErrorMessage] = useState("");
//   const inventory = 1;
//   // Used this variable to test ^^^

//   const updateQty = async () => {
//     try {
//       if (cartQuantity > inventory) {
//         setErrorMessage("Not enough inventory available.");
//         return;
//       }
      
//       const result = await handleUpdateQty(userToken, cartProdId, cartQuantity);
//       alert('Quantity has been updated!');
//       return result;
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleQuantityChange = (event) => {
//     setErrorMessage("");
//     setCartQuantity(event.target.value);
//   };

//   return (
//     <>
//       <div>
//         <select value={cartQuantity} onChange={handleQuantityChange}>
//           <option value={1}>1</option>
//           <option value={2}>2</option>
//           <option value={3}>3</option>
//         </select>
//         <button onClick={updateQty}>Update</button>
//       </div>
//       {errorMessage && <p>{errorMessage}</p>}
//     </>
//   );
// };

// export default UpdateQty;
