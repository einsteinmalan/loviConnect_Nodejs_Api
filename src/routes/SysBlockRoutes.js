import express from 'express';
import * as SysBlockController from '../controllers/SysBlockController';

const router = express.Router();

// Create System Block
router.post('/sys-blocks', SysBlockController.createSysBlock);

// Get System Block by ID
router.get('/sys-blocks/:sysBlockId', SysBlockController.getSysBlock);

// Get all System Blocks for a user
router.get('/sys-blocks/user/:userId', SysBlockController.getAllSysBlocksByUser);

// Update System Block
router.put('/sys-blocks/:sysBlockId', SysBlockController.updateSysBlock);

// Delete System Block
router.delete('/sys-blocks/:sysBlockId', SysBlockController.deleteSysBlock);

export default router;
