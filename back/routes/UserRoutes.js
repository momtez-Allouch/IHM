const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/getProfile/:id", userController.getProfile);
router.put("/updateProfile/:id", userController.updateProfile);

module.exports = router;
