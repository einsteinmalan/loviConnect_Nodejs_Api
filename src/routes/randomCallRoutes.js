const express = require("express");
const router = express.Router();
const randomCallController = require("../controllers/randomCallController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware.authenticateToken,
  randomCallController.createRandomCall,
);
router.get(
  "/",
  authMiddleware.authenticateToken,
  randomCallController.getRandomCalls,
);
router.get(
  "/:id",
  authMiddleware.authenticateToken,
  randomCallController.getRandomCallById,
);
router.put(
  "/:id",
  authMiddleware.authenticateToken,
  randomCallController.updateRandomCall,
);
router.delete(
  "/:id",
  authMiddleware.authenticateToken,
  randomCallController.deleteRandomCall,
);

module.exports = router;
