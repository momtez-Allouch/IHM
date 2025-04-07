const mongoose = require("mongoose");

// Remplacez l'URL par votre propre URL de connexion MongoDB
const dbURI =
  "mongodb+srv://allouchmomtez0:SFhlVEhNpyDX4DMl@cluster0.lqhqq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(dbURI)
  .then(() => console.log("Connexion à MongoDB établie"))
  .catch((err) => console.error("Erreur de connexion à MongoDB:", err));

module.exports = mongoose;
