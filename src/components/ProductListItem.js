import React from "react";
import { Link } from "react-router-dom"
import { checkUserCartExists, createNewCart, addProductToCart } from "../axios-services/index"

const ProductListItem = (props) => {
    // Will need to access productIds from props and dynamically set the :productId 
    const { product, user } = props;

    const addToCartHandler = async () => {
        try {
            // console.log(product, user.id)

            const _userCartExists = await checkUserCartExists(user.id);

            const payload = {
                ...product,
                cartId: _userCartExists.cartid
            }

            console.log(payload)

            if (!_userCartExists) {
                const createdCart = await createNewCart(user.id)
                console.log(createdCart);
            } else {
                // console.log(_userCartExists)
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