import React from "react";
import { Link } from "react-router-dom"

const ProductListItem = (props) => {
    // Will need to access productIds from props and dynamically set the :productId 
    const { product } = props;

    return (
        <div className="plp-item">
            <Link to={`/products/${product.prodid}`}>
                <img src={`${product.prodimg}`}></img>
            </Link>
            <h3>{product.prodmodelname}</h3>
            <p>${product.prodprice}</p>
            <button className="add-to-cart">Add to Cart</button>
        </div>
    )
}

export default ProductListItem;