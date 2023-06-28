import React, { useState } from "react";

const CartItem = () => {
    const [itemQuantity, setItemQuantity] = useState(1)

    const handleQuantityClicker = (event) => {
        setItemQuantity(parseInt(event.target.value,10))
    }

    return (
        <tr>
            <td>Product Name 1</td>
            <td>$10</td>
            <td>
                <input
                    type="number"
                    value={itemQuantity}
                    onChange={handleQuantityClicker}
                    >
                </input>
            </td>
            <td>${itemQuantity * 10}</td>
        </tr>
    )
}

export default CartItem;