const express = require("express");
const router = express.Router();
const supportController = require("../controllers/supportController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware.authenticateToken,
  supportController.createSupport,
);
router.get(
  "/",
  authMiddleware.authenticateToken,
  supportController.getSupports,
);
router.get(
  "/:id",
  authMiddleware.authenticateToken,
  supportController.getSupportById,
);
router.put(
  "/:id",
  authMiddleware.authenticateToken,
  supportController.updateSupport,
);
router.delete(
  "/:id",
  authMiddleware.authenticateToken,
  supportController.deleteSupport,
);

module.exports = router;
