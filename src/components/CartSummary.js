import React from "react";
import CartItem from "./CartItem";

const CartSummary = () => {
    // Need API endpoint to show all items in the user's cart 

    return (
        <div className="cart-container">
            <h3>Your Cart</h3>
            <table className="cart-table">
                <thead>
                    <tr className="cart-table-header">
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <CartItem />
                    <CartItem />
                    <CartItem />
                </tbody>
            </table>
        </div>
    )
}

export default CartSummary;