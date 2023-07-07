const client = require('../client');


const createCart = async ({
    prodId,
    prodModelName,
    prodDescription,
    prodImg,
    quantity,
    totalPrice,
    sessionId,
    userId
}) => {

    try {
        const { rows: [cart] } = await client.query(`
            INSERT INTO cart(cartProdId, cartProdName, cartProdDescription, prodImg, cartQuantity, cartTotalPrice, cartSessionId, userId)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `, [prodId, prodModelName, prodDescription, prodImg, quantity, totalPrice, sessionId, userId])

        return cart;
    } catch (error) {
        console.error(error)
    }
};

const getUserCart = async (userId, sessionId) => {
    try {
        const { rows: [userCart] } = await client.query(`
            SELECT *
            FROM cart
            WHERE userid = $1 OR (userid is null and cartsessionid = $2);
        `,[userId, sessionId])

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
    updateCart,
    getUserCart
}