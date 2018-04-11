const router = require("express").Router();
const foodController = require("../../controllers/foodController");

// Matches with "/api/food"
router
  .route("/")
  .get(foodController.getRestaurants);

module.exports = router;
