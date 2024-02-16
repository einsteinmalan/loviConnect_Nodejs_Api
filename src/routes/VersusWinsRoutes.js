import express from 'express';
import * as VersusWinsController from '../controllers/VersusWinsController';

const router = express.Router();

// Create Versus Win
router.post('/versus-wins', VersusWinsController.createVersusWin);

// Get Versus Win by ID
router.get('/versus-wins/:versusWinId', VersusWinsController.getVersusWin);

// Get Versus Wins by User
router.get('/versus-wins/user/:userId', VersusWinsController.getVersusWinsByUser);

// Update Versus Win
router.put('/versus-wins/:versusWinId', VersusWinsController.updateVersusWin);

// Delete Versus Win
router.delete('/versus-wins/:versusWinId', VersusWinsController.deleteVersusWin);

export default router;
