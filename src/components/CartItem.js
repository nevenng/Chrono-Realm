import React from "react";
import { RemoveFromCart, UpdateQty } from "../components";

const CartItem = (props) => {
    const { product, user, sessionId, fetchProductsCart, setProducts, index } = props;

    return (
        <tr>
    <td>{product.cartprodname}</td>
    <td>${product.cartprodprice}</td>
    <td>
        <UpdateQty
            index={index}
            product={product}
            user={user}
            sessionId={sessionId}
            fetchProductsCart={fetchProductsCart}
            setProducts={setProducts}
        />
    </td>
    <td>${product.carttotalprice}</td>
    <td>
        <RemoveFromCart
            product={product}
            user={user}
            sessionId={sessionId}
            fetchProductsCart={fetchProductsCart}
            setProducts={setProducts}
        />
    </td>
</tr>

    )
}

export default CartItem;