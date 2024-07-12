const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware.authenticateToken,
  profileController.createProfile,
);
router.get(
  "/",
  authMiddleware.authenticateToken,
  profileController.getProfiles,
);
router.get(
  "/:id",
  authMiddleware.authenticateToken,
  profileController.getProfileById,
);
router.put(
  "/:id",
  authMiddleware.authenticateToken,
  profileController.updateProfile,
);
router.delete(
  "/:id",
  authMiddleware.authenticateToken,
  profileController.deleteProfile,
);

module.exports = router;
