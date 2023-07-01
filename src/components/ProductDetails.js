import React, { useState, useEffect } from "react";

const ProductDetails = (props) => {
  const { product } = props;

  // console.log(product)

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
      <img src={product.prodimg} alt={product.prodmodelnname} />

      </div>
      <h3>Prod Name:{product.prodmodelname}</h3>
      <p>Price:{product.prodprice}</p>
      <p>Description: {product.proddescription}</p>
    </div>
  );
};

export default ProductDetails;
