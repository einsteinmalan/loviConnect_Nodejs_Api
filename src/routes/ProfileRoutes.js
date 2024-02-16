
import express from 'express';
import * as ProfileController from '../controllers/ProfileController';

const router = express.Router();

// Create Profile
router.post('/profiles', ProfileController.createProfile);

// Get Profile by ID
router.get('/profiles/:profileId', ProfileController.getProfile);

// Get all Profiles for a user
router.get('/profiles/user/:userId', ProfileController.getAllProfilesByUser);

// Update Profile
router.put('/profiles/:profileId', ProfileController.updateProfile);

// Delete Profile
router.delete('/profiles/:profileId', ProfileController.deleteProfile);

export default router;
