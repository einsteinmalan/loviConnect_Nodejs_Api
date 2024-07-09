const express = require("express");
const router = express.Router();
const inviteDatingController = require("../controllers/inviteDatingController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware.authenticateToken,
  inviteDatingController.createInviteDating,
);
router.get(
  "/",
  authMiddleware.authenticateToken,
  inviteDatingController.getInviteDatings,
);
router.get(
  "/:id",
  authMiddleware.authenticateToken,
  inviteDatingController.getInviteDatingById,
);
router.put(
  "/:id",
  authMiddleware.authenticateToken,
  inviteDatingController.updateInviteDating,
);
router.delete(
  "/:id",
  authMiddleware.authenticateToken,
  inviteDatingController.deleteInviteDating,
);

module.exports = router;
