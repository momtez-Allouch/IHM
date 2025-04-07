// routes/categoryRoutes.js
const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/CategoryController");

// Routes publiques
router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);

// // Routes protégées par authentification et rôle
// router.post("/", auth, checkRole("vendeur"), categoryController.createCategory);
// router.put("/:id", auth, categoryController.updateCategory);
// router.delete("/:id", auth, categoryController.deleteCategory);
// router.post("/:id/publier", auth, categoryController.publierCategory);

module.exports = router;
