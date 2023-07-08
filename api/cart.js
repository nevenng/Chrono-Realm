// api/cartendpoint.js
const express = require('express');
const { getAllCart, createCart, addProductToCart } = require('../db/models/cart');
const cartRouter = express.Router();

cartRouter.use((req, res, next) => {
    console.log('A request has been made to /cart');

    next();
})

// Get all user cart
// api/carts/cart
cartRouter.get('/cart', async (req, res, next) => {

    try {
        const cart = await getAllCart();
        res.send(cart);
    } catch (error) {
        next(error);
    }
});

// Add product to cart
// api/cart/add-to-cart
cartRouter.patch('/add-to-cart', async (req, res, next) => {
    const {
        prodId,
        prodModelName,
        prodDescription,
        prodImg,
        quantity,
        totalPrice,
        cartId
    } = req.body;

    const productData = {}

    try {   
        productData.prodId = prodId;
        productData.prodModelName = prodModelName;
        productData.prodDescription = prodDescription;
        productData.prodImg = prodImg;
        productData.quantity = quantity;
        productData.totalPrice = totalPrice;
        productData.cartId = cartId;

        const addedProduct = await addProductToCart(productData);

        res.send(addedProduct)
    } catch (error) {
        next(error);
    }
})


module.exports = cartRouter;
