const express = require("express");
const router = express.Router();
const galleryController = require("../controllers/galleryController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware.authenticateToken,
  galleryController.createGallery,
);
router.get(
  "/",
  authMiddleware.authenticateToken,
  galleryController.getGalleries,
);
router.get(
  "/:id",
  authMiddleware.authenticateToken,
  galleryController.getGalleryById,
);
router.put(
  "/:id",
  authMiddleware.authenticateToken,
  galleryController.updateGallery,
);
router.delete(
  "/:id",
  authMiddleware.authenticateToken,
  galleryController.deleteGallery,
);

module.exports = router;
