const SubCategory = require("../models/SubCategory");
const Article = require("../models/Article");

exports.createSubCategory = async (req, res) => {
  try {
    const { name, categorie, articles } = req.body;

    const subCategory = new SubCategory({
      name,
      categorie,
      articles,
    });

    await subCategory.save();

    // Associer les articles à la sous-catégorie
    if (articles && articles.length > 0) {
      await Article.updateMany(
        { _id: { $in: articles } },
        { $set: { subCategory: subCategory._id } }
      );
    }

    res.status(201).json({
      message: "Sous-catégorie créée avec succès",
      subCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la création de la sous-catégorie",
      error: error.message,
    });
  }
};

exports.getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find()
      .populate("articles")
      .sort({ createdAt: -1 });

    res.status(200).json(subCategories);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des sous-catégories",
      error: error.message,
    });
  }
};

exports.getSubCategoryById = async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id)
      .populate("categorie")
      .populate("articles");

    if (!subCategory) {
      return res.status(404).json({ message: "Sous-catégorie non trouvée" });
    }

    res.status(200).json(subCategory);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération de la sous-catégorie",
      error: error.message,
    });
  }
};

exports.updateSubCategory = async (req, res) => {
  try {
    const { name, categorie, articles } = req.body;

    const subCategory = await SubCategory.findById(req.params.id);

    if (!subCategory) {
      return res.status(404).json({ message: "Sous-catégorie non trouvée" });
    }

    subCategory.name = name || subCategory.name;
    subCategory.categorie = categorie || subCategory.categorie;
    subCategory.articles = articles || subCategory.articles;

    await subCategory.save();

    res.status(200).json({
      message: "Sous-catégorie mise à jour avec succès",
      subCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour de la sous-catégorie",
      error: error.message,
    });
  }
};

exports.deleteSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id);

    if (!subCategory) {
      return res.status(404).json({ message: "Sous-catégorie non trouvée" });
    }

    // Supprimer tous les articles associés
    await Article.deleteMany({ subCategory: subCategory._id });

    await SubCategory.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Sous-catégorie supprimée avec succès",
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression de la sous-catégorie",
      error: error.message,
    });
  }
};
