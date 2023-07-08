import React, { useState, useEffect } from "react";

const ProductDetails = (props) => {
  const { product } = props;

  if (!product) {
    return <div>Loading...</div>;
  }

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
          <p>${product.prodprice}</p>
          <button className="pdp-a2c-button">Add To Cart</button>
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
