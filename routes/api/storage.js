const router = require("express").Router();
const storageController = require("../../controllers/storageController");

// Matches with "/api/articles"
router.route("/")
  .get(storageController.findAll)
  .post(storageController.create);

// Matches with "/api/articles/:id"
router
  .route("/:id")
  .get(storageController.findById)
  .put(storageController.update)
  .delete(storageController.remove);

module.exports = router;
