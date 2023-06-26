import React from "react";
import { ProductListItem } from '../components'

const ProductListPage = () => {
    // Need to map through an array of products 

    return (
        <div className="plp-container">
            <ProductListItem />
            <ProductListItem />
            <ProductListItem />
            <ProductListItem />
            <ProductListItem />
            <ProductListItem />
        </div>
    )
}

export default ProductListPage;