import React from "react";
import { Link } from "react-router-dom"
import { checkUserCartExists, createNewCart, addProductToCart } from "../axios-services/index"
// import UID module

const ProductListItem = (props) => {
    // Will need to access productIds from props and dynamically set the :productId 
    const { product, user } = props;

    const addToCartHandler = async () => {
        try {
            // console.log(product, user.id)
            // Function to generate sessionId on any product clicked
            // only 1 sessionId per guest 

            const _userCartExists = await checkUserCartExists(user.id);

            const productData = {
                prodId: product.prodid,
                prodModelName: product.prodmodelname,
                prodDescription: product.proddescription,
                prodImg: product.prodimg,
                quantity: 1,
                prodPrice: product.prodprice,
                totalPrice: product.prodprice * 1,
                cartId: _userCartExists.cartid
            }

            // console.log(payload)

            if (!_userCartExists) {
                const createdCart = await createNewCart(user.id)
                console.log(createdCart);
            } else {
                const product = await addProductToCart(productData)
                
                if (product) {
                    alert('Product added!')
                }
            }

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="plp-item">
            <Link to={`/products/${product.prodid}`}>
                <img src={`${product.prodimg}`}></img>
            </Link>
            <h3>{product.prodmodelname}</h3>
            <p>${product.prodprice}</p>
            <button className="add-to-cart" onClick={addToCartHandler}>Add to Cart</button>
        </div>
    )
}

export default ProductListItem;