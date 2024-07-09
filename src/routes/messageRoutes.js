const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware.authenticateToken,
  messageController.createMessage,
);
router.get(
  "/",
  authMiddleware.authenticateToken,
  messageController.getMessages,
);
router.get(
  "/:id_message",
  authMiddleware.authenticateToken,
  messageController.getMessageById,
);
router.put(
  "/:id_message",
  authMiddleware.authenticateToken,
  messageController.updateMessage,
);
router.delete(
  "/:id_message",
  authMiddleware.authenticateToken,
  messageController.deleteMessage,
);

module.exports = router;
