import React from "react";
import { RemoveFromCart, UpdateQty } from "../components";

const CartItem = (props) => {
    // Once we get the cart data, pass it into remove from cart
    const { product } = props;

    return (
        <tr>
            <td>{product.cartprodname}</td>
            <td>${product.cartprodprice}</td>
            <td>
                <UpdateQty product={product} />
            </td>
            <td>${product.carttotalprice}</td>
            <td><RemoveFromCart /></td>
        </tr>
    )
}

export default CartItem;