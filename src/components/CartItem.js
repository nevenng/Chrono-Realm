import React from "react";
import { RemoveFromCart } from "../components";

const CartItem = () => {
    // Once we get the cart data, pass it into remove from cart
    
    return (
        <tr>
            <td>Product Name 1</td>
            <td>$10</td>
            <td>
                <form>
                    <input type="number"></input>
                </form>
            </td>
            <td>${100}</td>
            <td><RemoveFromCart /></td>
        </tr>
    )
}

export default CartItem;