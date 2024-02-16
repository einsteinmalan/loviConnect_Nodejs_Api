import express from 'express';
import * as GalleryController from '../controllers/GalleryController';

const router = express.Router();

// Create Gallery entry
router.post('/galleries', GalleryController.createGallery);

// Get Gallery entry by ID
router.get('/galleries/:galleryId', GalleryController.getGallery);

// Get all Gallery entries for a user
router.get('/galleries/user/:userId', GalleryController.getAllGalleriesByUser);

// Update Gallery entry
router.put('/galleries/:galleryId', GalleryController.updateGallery);

// Delete Gallery entry
router.delete('/galleries/:galleryId', GalleryController.deleteGallery);

export default router;
