import express from 'express';
import * as FakeController from '../controllers/FakeController';

const router = express.Router();

// Create Fake entry
router.post('/fakes', FakeController.createFake);

// Get Fake entry by ID
router.get('/fakes/:fakeId', FakeController.getFake);

// Get all Fake entries for a user
router.get('/fakes/user/:userId', FakeController.getAllFakesByUser);

// Update Fake entry
router.put('/fakes/:fakeId', FakeController.updateFake);

// Delete Fake entry
router.delete('/fakes/:fakeId', FakeController.deleteFake);

export default router;
