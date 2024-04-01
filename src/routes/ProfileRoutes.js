const express = require("express");
const router = express.Router();
const ProfileController = require("../controllers/ProfileController");
const auth = require("../middleware/auth");

// Create Profile
router.route("/create").post(auth, ProfileController.createProfile);

// Get Profile by ID
router.route("/:profileId").get(auth, ProfileController.getProfile);

// Get all Profiles for a user
router.route("/user/:userId").get(auth, ProfileController.getAllProfilesByUser);

// Update Profile
router.route("/update").post(auth, ProfileController.updateProfile);

// Delete Profile
router.route("/delete/:profileId").get(auth, ProfileController.deleteProfile);

module.exports = router;
