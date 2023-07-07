const express = require('express');
const router = express.Router();

const {
    getAllProducts,
    getProductById,
    checkUserRole
} = require('../db');


router.use((req, res, next) => {
    console.log("A request has been made to /products");
    
    next();
})

// GET /api/products

router.get("/", async (req, res, next) => {
    try{
        const user = req.user;

      if (!checkUserRole(user)) {
        return res.status(401).json({ message: 'You must be an admin to access this' });
      }
        const products = await getAllProducts();

        res.send(products)
    } catch(error){
        console.log(error);
        next(error);
    }

});

//GET /api/products/:prodId

router.get("/:prodId", async (req, res, next) => {
    try{
        const {prodId} = req.params;
        const product = await getProductById(prodId);

        res.send(product);
    } catch(error){
        console.log(error);
        next(error);
    }

})


module.exports = router;








