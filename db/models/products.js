const client = require('../client');

async function createProduct({
    prodId,
    brand,
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
    INSERT INTO products(prodId, brand, prodModelName, prodDescription, prodPrice, prodImg, prodAttributes, reviews, inventory)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
    `, [prodId, brand, prodModelName, prodDescription, prodPrice, prodImg, prodAttributes, reviews, inventory]);

        return products;
    }
    catch (error) {
        console.log(error);
        throw error;

    }
}

async function getAllProducts(){
    try{
        const {rows} = await client.query(
            `
            SELECT* FROM products
            `);
        
        return rows;
    }
    catch(error){
        console.log(error);
        throw error;
    }

}

async function getProductById(prodId) {
    try {
      const { rows: [product] } = await client.query(
        `
        SELECT * FROM products 
        WHERE prodId = $1;
        `,
        [prodId]
      );
      return product;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  


module.exports = {
    createProduct,
    getAllProducts,
    getProductById
};