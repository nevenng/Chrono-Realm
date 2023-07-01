import React, { useEffect, useState } from "react";
import { ProductListItem } from '../components'
import { fetchAllProducts } from "../axios-services";

const ProductListPage = () => {
    // Need to map through an array of products 

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsData = await fetchAllProducts();
                setProducts(productsData)
            } catch (error) {
                console.error(error)
            }
        }

        fetchData();
    }, [])

    return (
        <div className="plp-container">
            {products.map((product) => {
                return <ProductListItem key={product.id} product={product} />
            })}
        </div>
    )
}

export default ProductListPage;