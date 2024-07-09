const express = require("express");
const router = express.Router();
const randomCallQuotaController = require("../controllers/randomCallsQuotaController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware.authenticateToken,
  randomCallQuotaController.createRandomCallQuota,
);
router.get(
  "/",
  authMiddleware.authenticateToken,
  randomCallQuotaController.getRandomCallQuotas,
);
router.get(
  "/:id",
  authMiddleware.authenticateToken,
  randomCallQuotaController.getRandomCallQuotaById,
);
router.put(
  "/:id",
  authMiddleware.authenticateToken,
  randomCallQuotaController.updateRandomCallQuota,
);
router.delete(
  "/:id",
  authMiddleware.authenticateToken,
  randomCallQuotaController.deleteRandomCallQuota,
);

module.exports = router;
