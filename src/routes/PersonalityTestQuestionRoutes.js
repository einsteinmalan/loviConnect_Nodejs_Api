const express = require("express");
const router = express.Router();
const PersonalityTestQuestionController = require("../controllers/PersonalityTestQuestionController");
const auth = require("../middleware/auth");

// Create Personality test question
router
  .route("/create")
  .post(auth, PersonalityTestQuestionController.createPersonalityTestQuestion);

// Get Personality test question  by ID
router
  .route("/:inviteId")
  .get(auth, PersonalityTestQuestionController.getPersonalityTestQuestion);

// Get all Personality test question for a user
router
  .route("/user/:userId")
  .get(auth, PersonalityTestQuestionController.getPersonalityTestQuestion);

// Update Personality test question
router
  .route("/update")
  .post(auth, PersonalityTestQuestionController.updatePersonalityTestQuestion);

// Delete Personality test question
router
  .route("/delete/:inviteId")
  .get(auth, PersonalityTestQuestionController.deletePersonalityTestQuestion);

module.exports = router;
