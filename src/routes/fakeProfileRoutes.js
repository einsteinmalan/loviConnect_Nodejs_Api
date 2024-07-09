const express = require("express");
const router = express.Router();
const fakeProfileController = require("../controllers/fakeProfileController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware.authenticateToken,
  fakeProfileController.createFakeProfile,
);
router.get(
  "/",
  authMiddleware.authenticateToken,
  fakeProfileController.getFakeProfiles,
);
router.get(
  "/:id",
  authMiddleware.authenticateToken,
  fakeProfileController.getFakeProfileById,
);
router.put(
  "/:id",
  authMiddleware.authenticateToken,
  fakeProfileController.updateFakeProfile,
);
router.delete(
  "/:id",
  authMiddleware.authenticateToken,
  fakeProfileController.deleteFakeProfile,
);

module.exports = router;
