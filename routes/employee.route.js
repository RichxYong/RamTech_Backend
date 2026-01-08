



const router = require('express').Router();
const EmployeeController = require("../controllers/employee.controller")

router.get("/getemployees", EmployeeController.getAllEmployees);

router.get("/gettemployees/:id",EmployeeController.getOneEmployee);

router.post("/addemployee", EmployeeController.createEmployee);

router.delete('/deleteemployee/:id', EmployeeController.deleteEmployee);

router.put("/editemployee/:id", EmployeeController.editEmployee);


module.exports = router;