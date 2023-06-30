const express = require('express');
const router = express.Router();

const {
    getAllProducts
} = require('../db');


router.use((req, res, next) => {
    console.log("A request has been made to /products");
    
    next();
})

// GET /api/products

router.get("/", async (req, res, next) => {
    try{
        
        const products = await getAllProducts();

        res.send(products)
    } catch(error){
        console.log(error);
        next(error);
    }

});




module.exports = router;






