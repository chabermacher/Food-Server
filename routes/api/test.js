const router = require("express").Router();

// Matches with "/api/test"
router
  .route("/")
  .get(testController.testCall);

module.exports = router;
