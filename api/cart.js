// api/cartendpoint.js
const express = require('express');
const { createCart, getProductCart, addProductToCart, updateProductCart, removeProduct } = require('../db/models/cart');
const cartRouter = express.Router();

cartRouter.use((req, res, next) => {
    console.log('A request has been made to /cart');

    next();
})

cartRouter.post('/new-cart', async (req, res, next) => {
    const { userId, sessionId, cartStatus} = req.body

    const payload = {
        userId: userId || null,
        sessionId: sessionId,
        cartStatus: cartStatus
    }

    try {
        const newCart = await createCart(payload)
        res.send(newCart);
    } catch (error) {
        next(error)
    }
})

// Add product to cart
// api/cart/add
cartRouter.post('/add', async (req, res, next) => {
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

cartRouter.delete('/remove', async (req, res, next) => {
    const { prodId, cartId } = req.body

    try {
        const product = await removeProduct(cartId, prodId)

        res.send(`Removed ${prodId} successful`)
    } catch (error) {
        next(error);
    }
})


module.exports = cartRouter;
