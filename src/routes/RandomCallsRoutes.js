const express = require("express");
const router = express.Router();
const RandomCallsController = require("../controllers/RandomCallsController");
const auth = require("../middleware/auth");

// Create Random Call
router.route("/create").post(auth, RandomCallsController.createRandomCall);

// Get Random Call by ID
router.route("/:callId").get(auth, RandomCallsController.getRandomCall);

// Get all Random Calls for a user
router
  .route("/user/:userId")
  .get(auth, RandomCallsController.getAllRandomCallsByUser);

// Update Random Call
router.route("/update").post(auth, RandomCallsController.updateRandomCall);

// Delete Random Call
router
  .route("/delete/:callId")
  .get(auth, RandomCallsController.deleteRandomCall);

module.exports = router;
