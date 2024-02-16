import express from 'express';
import * as VersusLostsController from '../controllers/VersusLostsController';

const router = express.Router();

// Create Versus Lost
router.post('/versus-losts', VersusLostsController.createVersusLost);

// Get Versus Lost by ID
router.get('/versus-losts/:versusLostId', VersusLostsController.getVersusLost);

// Get Versus Losts by Chooser
router.get('/versus-losts/chooser/:chooserId', VersusLostsController.getVersusLostsByChooser);

// Update Versus Lost
router.put('/versus-losts/:versusLostId', VersusLostsController.updateVersusLost);

// Delete Versus Lost
router.delete('/versus-losts/:versusLostId', VersusLostsController.deleteVersusLost);

export default router;
