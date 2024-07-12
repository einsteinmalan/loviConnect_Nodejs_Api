const express = require("express");
const router = express.Router();
const inviteDatingQuotaController = require("../controllers/inviteDatingQuotaController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware.authenticateToken,
  inviteDatingQuotaController.createInviteDatingQuota,
);
router.get(
  "/",
  authMiddleware.authenticateToken,
  inviteDatingQuotaController.getInviteDatingQuotas,
);
router.get(
  "/:id",
  authMiddleware.authenticateToken,
  inviteDatingQuotaController.getInviteDatingQuotaById,
);
router.put(
  "/:id",
  authMiddleware.authenticateToken,
  inviteDatingQuotaController.updateInviteDatingQuota,
);
router.delete(
  "/:id",
  authMiddleware.authenticateToken,
  inviteDatingQuotaController.deleteInviteDatingQuota,
);

module.exports = router;
