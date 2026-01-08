

const router = require('express').Router();
const CustomerController = require("../controllers/customer.controller");

router.get("/getcustomers", CustomerController.getAllCustomers);  //get post delete put

router.get("/getcustomers/:id",CustomerController.getOneCustomer);

router.post("/addcustomer", CustomerController.createCustomer);

router.delete("/deletecustomer/:id",CustomerController.deleteCustomer );

router.put("/editcustomer/:id", CustomerController.editCustomer);

module.exports = router;