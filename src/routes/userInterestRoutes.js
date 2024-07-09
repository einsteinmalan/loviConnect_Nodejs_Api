const express = require("express");
const router = express.Router();
const userInterestController = require("../controllers/userInterestController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware.authenticateToken,
  userInterestController.createUserInterest,
);
router.get(
  "/",
  authMiddleware.authenticateToken,
  userInterestController.getUserInterests,
);
router.get(
  "/:id",
  authMiddleware.authenticateToken,
  userInterestController.getUserInterestById,
);
router.put(
  "/:id",
  authMiddleware.authenticateToken,
  userInterestController.updateUserInterest,
);
router.delete(
  "/:id",
  authMiddleware.authenticateToken,
  userInterestController.deleteUserInterest,
);

module.exports = router;
