// routes/articleRoutes.js
const express = require("express");
const router = express.Router();
const articleController = require("../controllers/ArticleController");

// Routes publiques
router.get("/", articleController.getAllArticles);
router.get("/:id", articleController.getArticleById);
router.get("/categorie/:catégorie", articleController.getArticlesByCategorie);
router.get("/vendeur/:vendeurId", articleController.getArticlesByVendeur);

// // Routes protégées par authentification et rôle
// router.post("/", auth, checkRole("vendeur"), articleController.createArticle);
// router.put("/:id", auth, articleController.updateArticle);
// router.delete("/:id", auth, articleController.deleteArticle);
// router.post("/:id/publier", auth, articleController.publierArticle);

module.exports = router;
