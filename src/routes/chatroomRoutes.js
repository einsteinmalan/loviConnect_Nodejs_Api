const express = require("express");
const router = express.Router();
const chatroomController = require("../controllers/chatroomController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/",
  authMiddleware.authenticateToken,
  chatroomController.createChatroom,
);
router.get(
  "/",
  authMiddleware.authenticateToken,
  chatroomController.getChatrooms,
);
router.get(
  "/:id_chatroom",
  authMiddleware.authenticateToken,
  chatroomController.getChatroomById,
);
router.put(
  "/:id_chatroom",
  authMiddleware.authenticateToken,
  chatroomController.updateChatroom,
);
router.delete(
  "/:id_chatroom",
  authMiddleware.authenticateToken,
  chatroomController.deleteChatroom,
);

module.exports = router;
