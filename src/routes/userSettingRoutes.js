const express = require("express");
const router = express.Router();
const userSettingController = require("../controllers/userSettingController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware.authenticateToken,
  userSettingController.createUserSetting,
);
router.get(
  "/",
  authMiddleware.authenticateToken,
  userSettingController.getUserSettings,
);
router.get(
  "/:id",
  authMiddleware.authenticateToken,
  userSettingController.getUserSettingById,
);
router.put(
  "/:id",
  authMiddleware.authenticateToken,
  userSettingController.updateUserSetting,
);
router.delete(
  "/:id",
  authMiddleware.authenticateToken,
  userSettingController.deleteUserSetting,
);

module.exports = router;
