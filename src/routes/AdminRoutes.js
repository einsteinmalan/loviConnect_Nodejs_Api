const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware.authenticateToken, adminController.createAdmin);
router.get("/", authMiddleware.authenticateToken, adminController.getAdmins);
router.get(
  "/:id",
  authMiddleware.authenticateToken,
  adminController.getAdminById,
);
router.put(
  "/:id",
  authMiddleware.authenticateToken,
  adminController.updateAdmin,
);
router.delete(
  "/:id",
  authMiddleware.authenticateToken,
  adminController.deleteAdmin,
);

module.exports = router;
