const router = require('express').Router();
const SaleController = require('../controllers/sale.controller');


router.get("/getsales", SaleController.getAllSales);

router.get("/getsales/:id", SaleController.getOneSale);

router.post("/addsale", SaleController.createSale);

router.delete("/deletesale/:id", SaleController.deleteSale);

router.put("/editsale/:id", SaleController.editSale);


module.exports = router;