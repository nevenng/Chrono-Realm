const client = require('../client');

async function createProduct({
    prodId,
    prodModelName,
    prodDescription,
    prodPrice,
    prodImg,
    prodAttributes,
    reviews,
    inventory

}) {
    try {
        const { rows: [products] } = await client.query(
            `
    INSERT INTO products(prodId, prodModelName, prodDescription, prodPrice, prodImg, prodAttributes, reviews, inventory)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
    `, [prodId, prodModelName, prodDescription, prodPrice, prodImg, prodAttributes, reviews, inventory]);

        return products;
    }
    catch (error) {
        console.log(error);
        throw error;

    }
}

module.exports = {
    createProduct
};