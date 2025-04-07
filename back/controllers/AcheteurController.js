const { Commande } = require("../models/Commande");
const { Article } = require("../models/Article");

exports.rechercherArticle = async (req, res) => {
  try {
    const { terme, catégorie, prixMin, prixMax } = req.query;

    // Construire le filtre de recherche
    const filter = {};

    if (terme) {
      filter.$or = [
        { titre: { $regex: terme, $options: "i" } },
        { description: { $regex: terme, $options: "i" } },
      ];
    }

    if (catégorie) {
      filter.catégorie = catégorie;
    }

    if (prixMin || prixMax) {
      filter.prix = {};
      if (prixMin) filter.prix.$gte = parseFloat(prixMin);
      if (prixMax) filter.prix.$lte = parseFloat(prixMax);
    }

    const articles = await Article.find(filter).populate(
      "vendeur",
      "nom email"
    );

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la recherche d'articles",
      error: error.message,
    });
  }
};

exports.suivreCommandes = async (req, res) => {
  try {
    const commandes = await Commande.find({ acheteur: req.userId }).populate(
      "articles",
      "titre prix"
    );

    res.status(200).json(commandes);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des commandes",
      error: error.message,
    });
  }
};
