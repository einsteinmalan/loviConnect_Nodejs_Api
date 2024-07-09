const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware.authenticateToken,
  notificationController.createNotification,
);
router.get(
  "/",
  authMiddleware.authenticateToken,
  notificationController.getNotifications,
);
router.get(
  "/:id_notif",
  authMiddleware.authenticateToken,
  notificationController.getNotificationById,
);
router.put(
  "/:id_notif",
  authMiddleware.authenticateToken,
  notificationController.updateNotification,
);
router.delete(
  "/:id_notif",
  authMiddleware.authenticateToken,
  notificationController.deleteNotification,
);

module.exports = router;
