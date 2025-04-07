const { Vendeur } = require("../models/Utilisateur");
const { Article } = require("../models/Article");

exports.ajouterArticle = async (req, res) => {
  try {
    const { titre, description, prix, catégorie } = req.body;

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
      message: "Article ajouté avec succès",
      article,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de l'ajout de l'article",
      error: error.message,
    });
  }
};

exports.supprimerArticle = async (req, res) => {
  try {
    const articleId = req.params.id;

    // Vérifier si l'article existe et appartient au vendeur
    const article = await Article.findById(articleId);

    if (!article) {
      return res.status(404).json({ message: "Article non trouvé" });
    }

    if (article.vendeur.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Vous n'êtes pas autorisé à supprimer cet article" });
    }

    await Article.findByIdAndDelete(articleId);

    // Retirer l'article de la liste des articles du vendeur
    await Vendeur.findByIdAndUpdate(req.userId, {
      $pull: { articles: articleId },
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
