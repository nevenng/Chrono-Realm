const client = require('../client');


async function createCart({
    prodId,
    prodModelName,
    prodDescription,
    prodImg,
    prodPrice,
    quantity,
    totalPrice,
    sessionId
}) {
    try {
        const { rows: [cart] } = await client.query(`
            INSERT INTO cart(cartProdId, cartProdName, cartProdDescription, prodImg, cartQuantity, cartTotalPrice, cartSessionId, userId)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *;
        `, [prodId, prodModelName, prodDescription, prodImg, prodPrice, quantity, totalPrice, sessionId])

        return cart;
    } catch (error) {
        console.error(error)
    }
};

module.exports = {
    createCart
}