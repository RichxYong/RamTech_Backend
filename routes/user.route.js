const router = require('express').Router();
const UserController = require("../controllers/user.controller");

router.post("/adduser",UserController.createUser);


router.get("/getusers",UserController.getAllUsers);
router.get("/getusers/:id",UserController.getOneUser);

router.delete("/deleteuser/:id",UserController.deleteUser);
router.put("/edituser/:id", UserController.editUser)

module.exports = router; 