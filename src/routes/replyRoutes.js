const express = require("express");
const router = express.Router();
const replyController = require("../controllers/replyController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware.authenticateToken, replyController.createReply);
router.get("/", authMiddleware.authenticateToken, replyController.getReplies);
router.get(
  "/:id",
  authMiddleware.authenticateToken,
  replyController.getReplyById,
);
router.put(
  "/:id",
  authMiddleware.authenticateToken,
  replyController.updateReply,
);
router.delete(
  "/:id",
  authMiddleware.authenticateToken,
  replyController.deleteReply,
);

module.exports = router;
