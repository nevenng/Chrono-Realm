import React from "react";

const CartItem = () => {

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
            <td><button className="cart-item-remove-button">remove</button></td>
        </tr>
    )
}

export default CartItem;