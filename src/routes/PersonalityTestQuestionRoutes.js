const express = require("express");
const router = express.Router();
const personalityTestQuestionController = require("../controllers/personalityTestQuestionController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware.authenticateToken,
  personalityTestQuestionController.createPersonalityTestQuestion,
);
router.get(
  "/",
  authMiddleware.authenticateToken,
  personalityTestQuestionController.getPersonalityTestQuestions,
);
router.get(
  "/:id",
  authMiddleware.authenticateToken,
  personalityTestQuestionController.getPersonalityTestQuestionById,
);
router.put(
  "/:id",
  authMiddleware.authenticateToken,
  personalityTestQuestionController.updatePersonalityTestQuestion,
);
router.delete(
  "/:id",
  authMiddleware.authenticateToken,
  personalityTestQuestionController.deletePersonalityTestQuestion,
);

module.exports = router;
