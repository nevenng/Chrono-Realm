// api/cartendpoint.js
const express = require('express');
const { getAllCarts,createCart, updateCart, deleteCart, checkoutCart } = require('../db/cart');
const router = express.Router();

// Get all carts
router.get('/cart', async (req, res, next) => {
    try {
        const carts = await getAllCarts();
        res.send(carts);
    } catch (error) {
        next(error);
    }
});

// Add to cart
router.post('/cart/add', async (req, res, next) => {
    try {
        const newCart = await createCart(req.body);
        res.send(newCart);
    } catch (error) {
        next(error);
    }
});

// Update cart
router.put('/cart/update/:cartId', async (req, res, next) => {
    try {
        const updatedCart = await updateCart(req.params.cartId, req.body);
        res.send(updatedCart);
    } catch (error) {
        next(error);
    }
});

// Remove from cart
router.delete('/cart/remove/:cartId', async (req, res, next) => {
    try {
        await deleteCart(req.params.cartId);
        res.send({ message: 'Cart item removed.' });
    } catch (error) {
        next(error);
    }
});

// Checkout cart
router.post('/cart/checkout/:cartId', async (req, res, next) => {
    try {
        await checkoutCart(req.params.cartId);
        res.send({ message: 'Checkout successful.' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
