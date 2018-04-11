const router = require("express").Router();
const storageRoutes = require("./storage");
const foodRoutes = require("./food");

// NYT routes
// router.use("/articles", articleRoutes);

router.use("/food", foodRoutes);

module.exports = router;
