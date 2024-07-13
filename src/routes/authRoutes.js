const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register-or-login", authController.registerOrLogin);
router.post("/verify-otp", authController.verifyOTP);
router.post("/refresh-token", authController.refreshToken);
router.post(
  "/fetch-users",
  authMiddleware.authenticateToken,
  authController.fetchUsers,
);
router.post(
  "/generate-users",
  authMiddleware.authenticateToken,
  authController.generateUsersAndProfiles,
);

module.exports = router;
