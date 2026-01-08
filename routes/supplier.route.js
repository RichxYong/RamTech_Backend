


const router = require('express').Router();
const SupplierController = require("../controllers/supplier.contoller")


router.get("/getsuppliers", SupplierController.getAllSuppliers);
router.get("/getsuppliers/:id", SupplierController.getOneSupplier);

router.post("/addsupplier", SupplierController.createSupplier);

router.delete("/deletesupplier/:id", SupplierController.deleteSupplier);

router.put("/editsupplier/:id", SupplierController.editSupplier)

module.exports = router;