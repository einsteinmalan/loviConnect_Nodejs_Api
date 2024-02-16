import express from 'express';
import * as SupportController from '../controllers/SupportController';

const router = express.Router();

// Create Support ticket
router.post('/supports', SupportController.createSupport);

// Get Support ticket by ID
router.get('/supports/:supportId', SupportController.getSupport);

// Get all Support tickets for a user
router.get('/supports/user/:userId', SupportController.getAllSupportsByUser);

// Update Support ticket
router.put('/supports/:supportId', SupportController.updateSupport);

// Delete Support ticket
router.delete('/supports/:supportId', SupportController.deleteSupport);

export default router;
