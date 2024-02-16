import express from 'express';
import * as UsersInterestsController from '../controllers/UsersInterestsController';

const router = express.Router();

// Create User Interest
router.post('/users-interests', UsersInterestsController.createUserInterest);

// Get User Interest by ID
router.get('/users-interests/:userInterestId', UsersInterestsController.getUserInterest);

// Get all User Interests for a user
router.get('/users-interests/user/:userId', UsersInterestsController.getAllUserInterestsByUser);

// Update User Interest
router.put('/users-interests/:userInterestId', UsersInterestsController.updateUserInterest);

// Delete User Interest
router.delete('/users-interests/:userInterestId', UsersInterestsController.deleteUserInterest);

export default router;
