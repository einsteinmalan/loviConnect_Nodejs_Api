const express = require("express");
const router = express.Router();
const versusWinController = require("../controllers/versusWinController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware.authenticateToken,
  versusWinController.createVersusWin,
);
router.get(
  "/",
  authMiddleware.authenticateToken,
  versusWinController.getVersusWins,
);
router.get(
  "/:id",
  authMiddleware.authenticateToken,
  versusWinController.getVersusWinById,
);
router.put(
  "/:id",
  authMiddleware.authenticateToken,
  versusWinController.updateVersusWin,
);
router.delete(
  "/:id",
  authMiddleware.authenticateToken,
  versusWinController.deleteVersusWin,
);

module.exports = router;
