import React, { useState, useEffect } from "react";
import { handleRemoveFromCart, fetchProductsCart } from '../axios-services';

const RemoveFromCart = (props) => {
    const { product, user, sessionId, fetchProductsCart, setProducts } = props;

    const removeFromCart = async () => {
        try {
            const result = await handleRemoveFromCart(product.cartid, product.cartprodid);
            // alert('Item has been removed from your cart!');
            const products = await fetchProductsCart(user?.id || null, sessionId);
            setProducts(products);
            return result;
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <button className="cart-item-remove-button" onClick={removeFromCart}>Remove</button>
    );
}

export default RemoveFromCart;