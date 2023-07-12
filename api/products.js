const express = require('express');
const router = express.Router();

const {
    getAllProducts,
    getProductById,
    checkUserRole,
    createProduct,
    deleteProductById
} = require('../db');


router.use((req, res, next) => {
    console.log("A request has been made to /products");

    next();
})

// GET /api/products

router.get("/", async (req, res, next) => {
    try {
        //     const user = req.user;

        //   if (!checkUserRole(user)) {
        //     return res.status(401).json({ message: 'You must be an admin to access this' });
        //   }
        const products = await getAllProducts();

        res.send(products)
    } catch (error) {
        console.log(error);
        next(error);
    }

});

//GET /api/products/:prodId

router.get("/:prodId", async (req, res, next) => {
    try {
        const { prodId } = req.params;
        const product = await getProductById(prodId);

        res.send(product);
    } catch (error) {
        console.log(error);
        next(error);
    }

})

// POST /api/products/create
router.post("/create", async (req, res, next) => {
    try {
        const {
            prodId,
            brand,
            prodModelName,
            prodDescription,
            prodPrice,
            prodImg,
            prodAttributes,
            reviews,
            inventory
        } = req.body;

        const newProduct = await createProduct({
            prodId,
            brand,
            prodModelName,
            prodDescription,
            prodPrice,
            prodImg,
            prodAttributes,
            reviews,
            inventory
        });

        res.send(newProduct);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// DELETE /api/products/:prodId
router.delete("/remove/:prodId", async (req, res, next) => {
    try {
      const { prodId } = req.params;
  
      await deleteProductById(prodId);
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

module.exports = router;








