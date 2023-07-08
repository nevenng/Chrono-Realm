const client = require('../client');

const createCart = async ({ userId, sessionId, cartStatus }) => {
    try {
        const { rows: [cart] } = await client.query(`
            INSERT INTO cart (cartSessionId, userId, cartStatus)
            VALUES ($1,$2,$3)
            RETURNING *;
        `, [sessionId || null, userId || null, cartStatus]);

        return cart;
    } catch (error) {
        console.error(error);
    }

}

const addProductToCart = async ({
    prodId,
    prodModelName,
    prodDescription,
    prodImg,
    prodPrice,
    quantity,
    totalPrice,
    cartId
}) => {

    try {
        const { rows: [cart] } = await client.query(`
            INSERT INTO cart_item(cartProdId, cartProdName, cartProdDescription, prodImg, cartProdPrice, cartQuantity, cartTotalPrice, cartId)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `, [prodId, prodModelName, prodDescription, prodImg, prodPrice, quantity, totalPrice, cartId])

        return cart;
    } catch (error) {
        console.error(error)
    }
};

const updateProductCart = async (cartId, prodId, quantity, totalprice) => {

    try {
        const { rows: [product] } = await client.query(`
            UPDATE cart_item
            SET cartquantity = $1, carttotalprice = $2
            WHERE cartid = $3 and cartProdId = $4
            RETURNING *;
        `, [quantity, totalprice, cartId, prodId]);

        return product;
    } catch (error) {
        throw error;
    }
}

const getUserActiveCart = async (userId, sessionId) => {
    try {
        const { rows: [userCart] } = await client.query(`
            SELECT *
            FROM cart
            WHERE userid = $1 OR (userid is null and cartsessionid = $2)
            AND cartstatus = "pending";
        `, [userId, sessionId])

        return userCart
    } catch (error) {
        throw error;
    }
}

const getProductCart = async (cartId, prodId) => {
    try {
        const { rows: [product] } = await client.query(`
            SELECT *
            FROM cart_item
            WHERE cartId = $1
            AND cartProdId = $2;
        `, [cartId, prodId])

        return product;
    } catch (error) {
        throw error;
    }
}

const removeProduct = async (cartId, prodId) => {
    try {
        await client.query(`
            DELETE FROM cart_item
            WHERE cartid = $1 and cartprodid = $2
        `, [cartId, prodId])
    } catch (error) {

    }
}

const removeCartProducts = async (cartId) => {
    try {
        await client.query(`
            DELETE FROM cart_item
            WHERE cartid = $1
        `,[cartId])
    } catch (error) {
        throw error
    }
}

module.exports = {
    createCart,
    getUserActiveCart,
    addProductToCart,
    updateProductCart,
    getProductCart,
    removeProduct
}