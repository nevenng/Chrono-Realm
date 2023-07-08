// api/cartendpoint.js
const express = require('express');
const { getProductCart, addProductToCart, updateProductCart } = require('../db/models/cart');
const cartRouter = express.Router();

cartRouter.use((req, res, next) => {
    console.log('A request has been made to /cart');

    next();
})

// Add product to cart
// api/cart/add-to-cart
cartRouter.post('/add-to-cart', async (req, res, next) => {
    const {
        prodId,
        prodModelName,
        prodDescription,
        prodImg,
        quantity,
        prodPrice,
        totalPrice,
        cartId
    } = req.body;

    const productData = {
        prodId,
        prodModelName,
        prodDescription,
        prodImg,
        prodPrice,
        quantity,
        totalPrice,
        cartId
    };

    try {
        // this code will update the qty and total price rather than create a new record of the product
        const existingProduct = await getProductCart(cartId, prodId);

        if (existingProduct) {
            existingProduct.cartquantity = existingProduct.cartquantity + 1;
            existingProduct.carttotalprice = existingProduct.cartquantity * existingProduct.cartprodprice;

            const updatedProduct = await updateProductCart(cartId, prodId, existingProduct.cartquantity, existingProduct.carttotalprice)

            res.send(updatedProduct)
        } else {
            const addedProduct = await addProductToCart(productData);
            res.send(addedProduct);
        }

        // res.send(existingProduct);
    } catch (error) {
        next(error);
    }
});



module.exports = cartRouter;
