const express = require("express");
const router = express.Router();
const GalleryController = require("../controllers/GalleryController");
const auth = require("../middleware/auth");

// Create Gallery entry
router.route("/create").post(auth, GalleryController.createGallery);

// Get Gallery entry by ID
router.route("/:galleryId").get(auth, GalleryController.getGallery);

// Get all Gallery entries for a user
router
  .route("/user/:userId")
  .get(auth, GalleryController.getAllGalleriesByUser);

// Update Gallery entry
router.route("/update").post(auth, GalleryController.updateGallery);

// Delete Gallery entry
router.route("/delete/:galleryId").get(auth, GalleryController.deleteGallery);

module.exports = router;
