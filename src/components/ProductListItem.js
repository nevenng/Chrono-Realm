import React from "react";
import { Link } from "react-router-dom"

const ProductListItem = (props) => {
    // Will need to access productIds from props and dynamically set the :productId 
    const { product } = props;
    console.log(product)

    return (
        <div className="plp-item">
            <Link to="/products/:productId">
                {/* <img src="https://www.mvmt.com/dw/image/v2/BDKZ_PRD/on/demandware.static/-/Sites-mgi-master/default/dw3b08217b/images/products/28000088_fr.jpg?sw=512&sh=640&q=85"></img> */}
                <img src={`${product.prodimg}`}></img>
            </Link>
            <h3>{product.prodmodelname}</h3>
            <p>${product.prodprice}</p>
            <button className="add-to-cart">Add to Cart</button>
        </div>
    )
}

export default ProductListItem;