import express from 'express';
import * as RandomCallsController from '../controllers/RandomCallsController';

const router = express.Router();

// Create Random Call
router.post('/random-calls', RandomCallsController.createRandomCall);

// Get Random Call by ID
router.get('/random-calls/:callId', RandomCallsController.getRandomCall);

// Get all Random Calls for a user
router.get('/random-calls/user/:userId', RandomCallsController.getAllRandomCallsByUser);

// Update Random Call
router.put('/random-calls/:callId', RandomCallsController.updateRandomCall);

// Delete Random Call
router.delete('/random-calls/:callId', RandomCallsController.deleteRandomCall);

export default router;
