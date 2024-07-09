const express = require("express");
const router = express.Router();
const ticketTypeController = require("../controllers/ticketTypeController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware.authenticateToken,
  ticketTypeController.createTicketType,
);
router.get(
  "/",
  authMiddleware.authenticateToken,
  ticketTypeController.getTicketTypes,
);
router.get(
  "/:id",
  authMiddleware.authenticateToken,
  ticketTypeController.getTicketTypeById,
);
router.put(
  "/:id",
  authMiddleware.authenticateToken,
  ticketTypeController.updateTicketType,
);
router.delete(
  "/:id",
  authMiddleware.authenticateToken,
  ticketTypeController.deleteTicketType,
);

module.exports = router;
