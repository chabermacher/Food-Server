const router = require("express").Router();
const articleController = require("../../controllers/foodController");

// Matches with "/api/food"
router
  .route("/")
  .get(articleController.findAll);

module.exports = router;
