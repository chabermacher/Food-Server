const router = require("express").Router();
const foodController = require("../../controllers/foodController");

// Matches with "/api/food"
router
  .route("/")
  .get(foodController.getRestaurants);

// matches with /api/food/id -> Marks a resaurant as "liked"
router
  .route("/restaurant/:id")
  .post(foodController.storeLike)
  .get(foodController.getRestaurantById);

// Matches with /api/food/viewall -> Returns all "liked" restaurants
router
  .route("/viewall")
  .get(foodController.getAllLikedRestaurants);

module.exports = router;
