const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

require("./config/db");

const articleRoutes = require("./routes/ArticleRoutes");
const categoryRoutes = require("./routes/CategoryRoutes");
const subCategoryRoutes = require("./routes/SubCategoryRoutes");
const userRoutes = require("./routes/UserRoutes");

app.use(express.json());
app.use(cors());

app.use("/api/article", articleRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/sub-category", subCategoryRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
