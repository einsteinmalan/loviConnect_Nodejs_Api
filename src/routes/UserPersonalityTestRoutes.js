const express = require("express");
const router = express.Router();
const userPersonalityTestController = require("../controllers/userPersonalityTestController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware.authenticateToken,
  userPersonalityTestController.createUserPersonalityTest,
);
router.get(
  "/",
  authMiddleware.authenticateToken,
  userPersonalityTestController.getUserPersonalityTests,
);
router.get(
  "/:id",
  authMiddleware.authenticateToken,
  userPersonalityTestController.getUserPersonalityTestById,
);
router.put(
  "/:id",
  authMiddleware.authenticateToken,
  userPersonalityTestController.updateUserPersonalityTest,
);
router.delete(
  "/:id",
  authMiddleware.authenticateToken,
  userPersonalityTestController.deleteUserPersonalityTest,
);

module.exports = router;
