const express = require("express");
const router = express.Router();
const blockController = require("../controllers/blockController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware.authenticateToken, blockController.createBlock);
router.get("/", authMiddleware.authenticateToken, blockController.getBlocks);
router.get(
  "/:id_block",
  authMiddleware.authenticateToken,
  blockController.getBlockById,
);
router.put(
  "/:id_block",
  authMiddleware.authenticateToken,
  blockController.updateBlock,
);
router.delete(
  "/:id_block",
  authMiddleware.authenticateToken,
  blockController.deleteBlock,
);

module.exports = router;
