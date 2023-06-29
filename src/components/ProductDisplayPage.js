import React from "react";
import { useParams } from "react-router-dom";

const ProductDisplayPage = () => {
//   const { productId } = useParams();
  // Would I need useParams? or would passing in props be easier

  // Need to map thru data 
  // Redo UI once products are live

  // test data 

  return (
    <div>
      <img src={product.prodImg} alt={product.prodModelName} />
      <h3>{product.prodModelName}</h3>
      <p>{product.prodPrice}</p>
      <p>{product.prodDescription}</p>
    </div>
  );
};

export default ProductDisplayPage;
