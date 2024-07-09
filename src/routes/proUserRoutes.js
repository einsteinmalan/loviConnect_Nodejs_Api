const express = require("express");
const router = express.Router();
const proUserController = require("../controllers/proUserController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware.authenticateToken,
  proUserController.createProUser,
);
router.get(
  "/",
  authMiddleware.authenticateToken,
  proUserController.getProUsers,
);
router.get(
  "/:id",
  authMiddleware.authenticateToken,
  proUserController.getProUserById,
);
router.put(
  "/:id",
  authMiddleware.authenticateToken,
  proUserController.updateProUser,
);
router.delete(
  "/:id",
  authMiddleware.authenticateToken,
  proUserController.deleteProUser,
);

module.exports = router;
