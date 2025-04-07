const express = require("express");
const router = express.Router();
const subCategoryController = require("../controllers/SubCategoryController");

router.post("/subCategory", subCategoryController.createSubCategory);
router.get("/", subCategoryController.getAllSubCategories);
router.get("/subCategory/:id", subCategoryController.getSubCategoryById);
router.put("/subCategory/:id", subCategoryController.updateSubCategory);
router.delete("/subCategory/:id", subCategoryController.deleteSubCategory);

module.exports = router;
