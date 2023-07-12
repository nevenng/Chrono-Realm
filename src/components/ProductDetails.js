import React, { useState, useEffect } from "react";
import { checkUserCartExists, createNewCart, addProductToCart } from "../axios-services/index"

const ProductDetails = (props) => {
  const { product, user, sessionId } = props;
  console.log(product)

  if (!product) {
    return <div>Loading...</div>;
  }

  const addToCartHandler = async () => {
    try {
      if (!user) {
        const _userCartExists = await checkUserCartExists(null, sessionId);

        if (!_userCartExists) {
          const createdGuestCart = await createNewCart(null, sessionId);
          console.log(createdGuestCart);
        } else {
          const productData = {
            prodId: product.prodid,
            prodModelName: product.prodmodelname,
            prodDescription: product.proddescription,
            prodImg: product.prodimg,
            quantity: 1,
            prodPrice: product.prodprice,
            totalPrice: product.prodprice * 1,
            cartId: _userCartExists.cartid
          };

          const addedUserProduct = await addProductToCart(productData);

          if (addedUserProduct) {
            alert('Product added!');
          }
        }
      } else if (user) {
        const _userCartExists = await checkUserCartExists(user.id, sessionId);

        if (!_userCartExists) {
          await createNewCart(user.id || null, sessionId);
        } else {
          const productData = {
            prodId: product.prodid,
            prodModelName: product.prodmodelname,
            prodDescription: product.proddescription,
            prodImg: product.prodimg,
            quantity: 1,
            prodPrice: product.prodprice,
            totalPrice: product.prodprice * 1,
            cartId: _userCartExists.cartid
          };

          const addedUserProduct = await addProductToCart(productData);

          if (addedUserProduct) {
            alert('Product added!');
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  const formatPriceWithCommas = (price) => {
    const formattedPrice = parseFloat(price).toFixed(2);
    return formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <>
      <div className="pdp-display-container">
        <div className="pdp-img-container">
          <img className="pdp-img" src={product.prodimg} alt={product.prodmodelnname} />
        </div>
        <div className="pdp-details-container">
          <h3>{product.prodmodelname}</h3>
          <hr></hr>
          <p> {product.brand}</p>
          <p>${formatPriceWithCommas(product.prodprice)}</p>
          <button className="pdp-a2c-button" onClick={addToCartHandler}>Add To Cart</button>
        </div>
        <div className="pdp-description-container">
          <h4>Description</h4>
          <p>{product.proddescription}</p>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
