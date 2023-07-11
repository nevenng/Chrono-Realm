import React, { useEffect, useState } from "react";
import { CartItem, CheckoutButton } from "../components";
import { fetchProductsCart } from "../axios-services";

const CartSummary = (props) => {
    // Need API endpoint to show all items in the user's cart 
    const { user, sessionId } = props;

    console.log(user)

    const [products, setProducts] = useState([])

    useEffect(() => {
        async function fetchCartData() {
            try {
                const response = await fetchProductsCart(user?.id || null, sessionId);
                setProducts(response);
            } catch (error) {
                console.error(error);
            }
        }

        const timer = setTimeout(() => {
            fetchCartData();
        }, 100);

        return () => clearTimeout(timer);
    }, [user, sessionId]);

    return (
        <>
            <div className="cart-container">
                <h3>Your Cart</h3>
                <table className="cart-table">
                    <thead>
                        <tr className="cart-table-header">
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products ? products.map(product => {
                            return <CartItem key={product.cartprodid} product={product} user={user} sessionId={sessionId} fetchProductsCart={fetchProductsCart} setProducts={setProducts} />
                        }) : <tr></tr>}
                        {/* <CartItem />
                    <CartItem /> */}
                    </tbody>
                </table>
            </div>
            {products.length > 0 && <CheckoutButton />}
        </>
    )
}

export default CartSummary;