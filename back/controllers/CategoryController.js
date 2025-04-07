const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const { name, subCategories } = req.body;

    const category = new Category({
      name,
      subCategories,
    });

    await category.save();

    res.status(201).json({
      message: "Catégorie créée avec succès",
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la création de la catégorie",
      error: error.message,
    });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const { name } = req.query;
    const filter = {};

    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    const categories = await Category.find(filter)
      .populate("subCategories")
      .sort({ createdAt: -1 });

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des catégories",
      error: error.message,
    });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate(
      "subCategories"
    );

    if (!category) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération de la catégorie",
      error: error.message,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { name, subCategories } = req.body;

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }

    category.name = name || category.name;
    category.subCategories = subCategories || category.subCategories;

    await category.save();

    res.status(200).json({
      message: "Catégorie mise à jour avec succès",
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour de la catégorie",
      error: error.message,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }

    await Category.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Catégorie supprimée avec succès",
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression de la catégorie",
      error: error.message,
    });
  }
};
