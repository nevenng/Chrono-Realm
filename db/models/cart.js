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
    quantity,
    totalPrice,
    cartId
}) => {

    try {
        const { rows: [cart] } = await client.query(`
            INSERT INTO cart_item(cartProdId, cartProdName, cartProdDescription, prodImg, cartQuantity, cartTotalPrice, cartId)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `, [prodId, prodModelName, prodDescription, prodImg, quantity, totalPrice, cartId])

        return cart;
    } catch (error) {
        console.error(error)
    }
};

const getAllCart = async () => {
    try {
        const { rows: carts } = await client.query(`
            SELECT *
            FROM cart
        `)
        return carts;
    } catch (error) {
        throw error;
    }
}

const getUserCart = async (userId, sessionId) => {
    try {
        const { rows: [userCart] } = await client.query(`
            SELECT *
            FROM cart
            WHERE userid = $1 OR (userid is null and cartsessionid = $2);
        `, [userId, sessionId])

        return userCart
    } catch (error) {
        throw error;
    }
}


const updateCart = async (cartId, fields = {}) => {
    // build set string
    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');

    if (setString.length === 0) {
        return;
    }

    try {
        const { rows: [cart] } = await client.query(`
            UPDATE cart
            SET ${setString}
            WHERE cartid = ${cartId}
            RETURNING *;
        `, Object.values(fields));

        return cart;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createCart,
    getAllCart,
    getUserCart,
    updateCart,
    addProductToCart
}