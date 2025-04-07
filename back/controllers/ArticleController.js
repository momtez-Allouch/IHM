// controllers/articleController.js
const Article = require("../models/Article");
const Vendeur = require("../models/Vendeur");

exports.createArticle = async (req, res) => {
  try {
    const { titre, description, prix, catégorie } = req.body;

    // Vérifier que l'utilisateur est un vendeur
    const vendeur = await Vendeur.findById(req.userId);
    if (!vendeur) {
      return res.status(403).json({
        message: "Seuls les vendeurs peuvent créer des articles",
      });
    }

    const article = new Article({
      titre,
      description,
      prix,
      catégorie,
      vendeur: req.userId,
    });

    await article.save();

    // Ajouter l'article à la liste des articles du vendeur
    await Vendeur.findByIdAndUpdate(req.userId, {
      $push: { articles: article._id },
    });

    res.status(201).json({
      message: "Article créé avec succès",
      article,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la création de l'article",
      error: error.message,
    });
  }
};

exports.getAllArticles = async (req, res) => {
  try {
    const { titre, catégorie, prixMin, prixMax, vendeur } = req.query;

    // Construire le filtre de recherche
    const filter = {};

    if (titre) {
      filter.titre = { $regex: titre, $options: "i" };
    }

    if (catégorie) {
      filter.catégorie = catégorie;
    }

    if (prixMin || prixMax) {
      filter.prix = {};
      if (prixMin) filter.prix.$gte = parseFloat(prixMin);
      if (prixMax) filter.prix.$lte = parseFloat(prixMax);
    }

    if (vendeur) {
      filter.vendeur = vendeur;
    }

    const articles = await Article.find(filter)
      .populate("vendeur", "nom email")
      .sort({ createdAt: -1 });

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des articles",
      error: error.message,
    });
  }
};

exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate(
      "vendeur",
      "nom email"
    );

    if (!article) {
      return res.status(404).json({ message: "Article non trouvé" });
    }

    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération de l'article",
      error: error.message,
    });
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const { titre, description, prix, catégorie } = req.body;

    // Trouver l'article et vérifier si l'utilisateur est le vendeur
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article non trouvé" });
    }

    if (article.vendeur.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Vous n'êtes pas autorisé à modifier cet article" });
    }

    // Mettre à jour l'article
    article.titre = titre || article.titre;
    article.description = description || article.description;
    article.prix = prix || article.prix;
    article.catégorie = catégorie || article.catégorie;

    await article.save();

    res.status(200).json({
      message: "Article mis à jour avec succès",
      article,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour de l'article",
      error: error.message,
    });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    // Trouver l'article et vérifier si l'utilisateur est le vendeur
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article non trouvé" });
    }

    if (article.vendeur.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Vous n'êtes pas autorisé à supprimer cet article" });
    }

    await Article.findByIdAndDelete(req.params.id);

    // Supprimer l'article de la liste des articles du vendeur
    await Vendeur.findByIdAndUpdate(req.userId, {
      $pull: { articles: req.params.id },
    });

    res.status(200).json({
      message: "Article supprimé avec succès",
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression de l'article",
      error: error.message,
    });
  }
};

exports.getArticlesByCategorie = async (req, res) => {
  try {
    const { catégorie } = req.params;

    const articles = await Article.find({ catégorie })
      .populate("vendeur", "nom email")
      .sort({ createdAt: -1 });

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des articles par catégorie",
      error: error.message,
    });
  }
};

exports.getArticlesByVendeur = async (req, res) => {
  try {
    const { vendeurId } = req.params;

    const articles = await Article.find({ vendeur: vendeurId }).sort({
      createdAt: -1,
    });

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des articles du vendeur",
      error: error.message,
    });
  }
};

exports.publierArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article non trouvé" });
    }

    if (article.vendeur.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Vous n'êtes pas autorisé à publier cet article" });
    }

    // Simuler la méthode publier() de l'article
    await article.publier();

    res.status(200).json({
      message: "Article publié avec succès",
      article,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la publication de l'article",
      error: error.message,
    });
  }
};

module.exports = exports;
