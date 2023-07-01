import React from "react";
import { ProductDetails } from '../components'
import { fetchProdId } from '../axios-services'
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const ProductDisplayPage = () => {
    const { prodId } = useParams()
    const [product, setProduct] = useState(null);
    console.log(prodId)

    useEffect(() => {
        const getPdp = async () => {
            const results = await fetchProdId(prodId);
            setProduct(results);
        }
        getPdp();
    }, []);

    // console.log(product)

    return (
        <div className="pdp-container">
            <ProductDetails product={product} />
        </div>
    )
}

export default ProductDisplayPage;