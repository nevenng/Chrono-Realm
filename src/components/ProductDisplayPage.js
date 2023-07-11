import React from "react";
import { ProductDetails, ProductCarousel } from '../components'
import { fetchProdId } from '../axios-services'
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const ProductDisplayPage = (props) => {
    const { user, sessionId } = props;
    const { prodId } = useParams()
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const getPdp = async () => {
            const results = await fetchProdId(prodId);
            setProduct(results);
        }
        getPdp();
    }, []);

    return (
        <div className="pdp-container">
            <ProductDetails product={product} user={user} sessionId={sessionId} />
            <ProductCarousel product={product} />
        </div>
    )
}

export default ProductDisplayPage;