const mongoose = require("mongoose");
const articleSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    prix: {
      type: Number,
      required: true,
      min: 0,
    },
    catégorie: {
      type: String,
      required: true,
    },
    vendeur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendeur",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Méthode pour publier un article
articleSchema.methods.publier = async function () {
  // Logique pour publier un article
};

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
