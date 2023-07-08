import React, { useState } from "react";
import { handleRemoveFromCart } from '../axios-services';

const RemoveFromCart = ({ userToken, cartProdId }) => {
    const [isRemoved, setRemoved] = useState(false);

    const removeFromCart = async () => {
        try {
            const result = await handleRemoveFromCart(userToken, cartProdId);
            alert('Item has been removed from your cart!');
            setRemoved(true);
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