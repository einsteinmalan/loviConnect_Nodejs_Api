const express = require("express");
const router = express.Router();
const UserFiltersController = require("../controllers/UserFiltersController");
const auth = require("../middleware/auth");

// Create User Filters
router.route("/create").post(auth, UserFiltersController.createUserFilters);

// Get User Filters by ID
router.route("/:filtersId").get(auth, UserFiltersController.getUserFilters);

// Get User Filters by User
router
  .route("/user/:userId")
  .get(auth, UserFiltersController.getUserFiltersByUser);

// Update User Filters
router.route("/update").post(auth, UserFiltersController.updateUserFilters);

// Delete User Filters
router
  .route("/delete/:filtersId")
  .get(auth, UserFiltersController.deleteUserFilters);

module.exports = router;
