const express = require("express");
const router = express.Router();
const interestController = require("../controllers/interestController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware.authenticateToken,
  interestController.createInterest,
);
router.get(
  "/",
  authMiddleware.authenticateToken,
  interestController.getInterests,
);
router.get(
  "/:id",
  authMiddleware.authenticateToken,
  interestController.getInterestById,
);
router.put(
  "/:id",
  authMiddleware.authenticateToken,
  interestController.updateInterest,
);
router.delete(
  "/:id",
  authMiddleware.authenticateToken,
  interestController.deleteInterest,
);

module.exports = router;
