// api/cartendpoint.js
const express = require('express');
const { getAllCart, createCart } = require('../db/models/cart');
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

cartRouter.post('/add', async (req, res, next) => {
    const {
        prodId,
        prodModelName,
        prodDescription,
        prodImg,
        quantity,
        totalPrice,
        sessionId,
        userId
    } = req.body;

    const cartData = {}

    try {   
        cartData.prodId = prodId;
        cartData.prodModelName = prodModelName;
        cartData.prodDescription = prodDescription;
        cartData.prodImg = prodImg;
        cartData.quantity = quantity;
        cartData.totalPrice = totalPrice;
        cartData.sessionId = sessionId;
        cartData.userId = userId;

        const cart = await createCart(cartData);

        res.send(cart)
    } catch (error) {
        next(error);
    }
})


module.exports = cartRouter;
