const express = require("express");
const router = express.Router();
const UserSettingsController = require("../controllers/UserSettingsController");
const auth = require("../middleware/auth");

// Create User Settings
router.route("/create").post(auth, UserSettingsController.createUserSettings);

// Get User Settings by ID
router.route("/:settingsId").get(auth, UserSettingsController.getUserSettings);

// Get User Settings by User
router
  .route("/user/:userId")
  .get(auth, UserSettingsController.getUserSettingsByUser);

// Update User Settings
router.route("/update").post(auth, UserSettingsController.updateUserSettings);

// Delete User Settings
router
  .route("/delete/:settingsId")
  .get(auth, UserSettingsController.deleteUserSettings);

module.exports = router;
