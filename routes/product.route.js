
const router = require('express').Router();
const productController = require('../controllers/product.controller');
const ProductController = require("../controllers/product.controller")


router.get("/getproducts", ProductController.getAllProducts);
router.get("/getproducts/:id", ProductController.getOneProduct);

router.post("/addproduct", ProductController.createProduct);

router.delete("/deleteproduct/:id", productController.deleteProduct);

router.put("/editproduct/:id", ProductController.editProduct);

module.exports = router;