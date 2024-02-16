import express from 'express';
import * as BlockController from '../controllers/blockController';

const router = express.Router();

// Create block
router.post('/blocks', BlockController.createBlock);

// Get block by ID
router.get('/blocks/:blockId', BlockController.getBlock);

// Get all blocks for a user
router.get('/blocks/user/:userId', BlockController.getAllBlocksByUser);

// Update block
router.put('/blocks/:blockId', BlockController.updateBlock);

// Delete block
router.delete('/blocks/:blockId', BlockController.deleteBlock);

export default router;
