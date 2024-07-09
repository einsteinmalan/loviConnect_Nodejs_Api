const express = require("express");
const router = express.Router();
const boosterController = require("../controllers/boosterController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware.authenticateToken,
  boosterController.createBooster,
);
router.get(
  "/",
  authMiddleware.authenticateToken,
  boosterController.getBoosters,
);
router.get(
  "/:id",
  authMiddleware.authenticateToken,
  boosterController.getBoosterById,
);
router.put(
  "/:id",
  authMiddleware.authenticateToken,
  boosterController.updateBooster,
);
router.delete(
  "/:id",
  authMiddleware.authenticateToken,
  boosterController.deleteBooster,
);

module.exports = router;
