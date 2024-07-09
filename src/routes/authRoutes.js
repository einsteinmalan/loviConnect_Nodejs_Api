const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register-or-login", authController.registerOrLogin);
router.post("/verify-otp", authController.verifyOTP);
router.post("/refresh-token", authController.refreshToken);

module.exports = router;
