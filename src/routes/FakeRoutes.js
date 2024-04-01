const express = require("express");
const router = express.Router();
const FakeController = require("../controllers/FakeController");
const auth = require("../middleware/auth");

// Create Fake entry
router.route("/create").post(auth, FakeController.createFake);

// Get Fake entry by ID
router.route("/:fakeId").get(auth, FakeController.getFake);

// Get all Fake entries for a user
router.route("/user/:userId").get(auth, FakeController.getAllFakesByUser);

// Update Fake entry
router.route("/update").post(auth, FakeController.updateFake);

// Delete Fake entry
router.route("/delete/:fakeId").get(auth, FakeController.deleteFake);

module.exports = router;
