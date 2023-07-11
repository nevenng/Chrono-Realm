import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const CheckoutButton = () => {
    const history = useHistory();

    const handleCheckout = (event) => {
        event.preventDefault();
        history.push('/confirmation');
    };


    return (
        <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
    )
}

export default CheckoutButton;