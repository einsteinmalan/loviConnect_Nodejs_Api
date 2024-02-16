
import express from 'express';
import * as UserPersonalityTestController from '../controllers/UserPersonalityTestController';

const router = express.Router();

// Create User Personality test
router.post('/user-personality-tests', UserPersonalityTestController.createUserPersonalityTest);

// Get User Personality test by ID
router.get('/user-personality-tests/:testId', UserPersonalityTestController.getUserPersonalityTest);

// Get all User Personality tests for a user
router.get('/user-personality-tests/user/:userId', UserPersonalityTestController.getAllUserPersonalityTestsByUser);

// Update User Personality test
router.put('/user-personality-tests/:testId', UserPersonalityTestController.updateUserPersonalityTest);

// Delete User Personality test
router.delete('/user-personality-tests/:testId', UserPersonalityTestController.deleteUserPersonalityTest);

export default router;
