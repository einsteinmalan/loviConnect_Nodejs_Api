const express = require("express");
const router = express.Router();
const SupportController = require("../controllers/SupportController");
const auth = require("../middleware/auth");

// Create Support ticket
router.route("/create").post(auth, SupportController.createSupport);

// Get Support ticket by ID
router.route("/:supportId").get(auth, SupportController.getSupport);

// Get all Support tickets for a user
router.route("/user/:userId").get(auth, SupportController.getAllSupportsByUser);

// Update Support ticket
router.route("/update").post(auth, SupportController.updateSupport);

// Delete Support ticket
router.route("/delete/:supportId").get(auth, SupportController.deleteSupport);

module.exports = router;
