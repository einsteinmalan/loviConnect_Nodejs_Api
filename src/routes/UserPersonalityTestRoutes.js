const express = require("express");
const router = express.Router();
const UserPersonalityTestController = require("../controllers/UserPersonalityTestController");
const auth = require("../middleware/auth");

// Create User Personality test
router
  .route("/create")
  .post(auth, UserPersonalityTestController.createUserPersonalityTest);

// Get User Personality test by ID
router
  .route("/:testId")
  .get(auth, UserPersonalityTestController.getUserPersonalityTest);

// Get all User Personality tests for a user
router
  .route("/user/:userId")
  .get(auth, UserPersonalityTestController.getAllUserPersonalityTestsByUser);

// Update User Personality test
router
  .route("/update")
  .post(auth, UserPersonalityTestController.updateUserPersonalityTest);

// Delete User Personality test
router
  .route("/delete/:testId")
  .get(auth, UserPersonalityTestController.deleteUserPersonalityTest);

module.exports = router;
