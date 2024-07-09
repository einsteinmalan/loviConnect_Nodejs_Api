const express = require("express");
const router = express.Router();
const likeController = require("../controllers/likeController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware.authenticateToken, likeController.createLike);
router.get("/", authMiddleware.authenticateToken, likeController.getLikes);
router.get(
  "/:id_likes",
  authMiddleware.authenticateToken,
  likeController.getLikeById,
);
router.put(
  "/:id_likes",
  authMiddleware.authenticateToken,
  likeController.updateLike,
);
router.delete(
  "/:id_likes",
  authMiddleware.authenticateToken,
  likeController.deleteLike,
);

module.exports = router;
