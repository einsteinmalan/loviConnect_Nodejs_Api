const express = require("express");
const router = express.Router();
const userSettingController = require("../controllers/userSettingController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware.authenticateToken,
  userSettingController.createUserSettings,
);
router.get(
  "/",
  authMiddleware.authenticateToken,
  userSettingController.getUserSettings,
);
router.get(
  "/:id",
  authMiddleware.authenticateToken,
  userSettingController.updateUserSettingsById,
);
router.put(
  "/:id",
  authMiddleware.authenticateToken,
  userSettingController.updateUserSettingsById,
);
router.delete(
  "/:id",
  authMiddleware.authenticateToken,
  userSettingController.deleteUserSettings,
);

module.exports = router;
