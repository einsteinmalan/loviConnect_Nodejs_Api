const express = require("express");
const router = express.Router();
const UsersInterestsController = require("../controllers/UsersInterestsController");
const auth = require("../middleware/auth");

// Create User Interest
router.route("/create").post(auth, UsersInterestsController.createUserInterest);

// Get User Interest by ID
router
  .route("/:userInterestId")
  .get(auth, UsersInterestsController.getUserInterest);

// Get all User Interests for a user
router
  .route("/user/:userId")
  .get(auth, UsersInterestsController.getAllUserInterestsByUser);

// Update User Interest
router.route("/update").post(auth, UsersInterestsController.updateUserInterest);

// Delete User Interest
router
  .route("/delete/:userInterestId")
  .get(auth, UsersInterestsController.deleteUserInterest);

module.exports = router;
