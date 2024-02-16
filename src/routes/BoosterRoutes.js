import express from 'express';
import * as BoosterController from '../controllers/BoosterController';

const router = express.Router();

// Create Booster
router.post('/boosters', BoosterController.createBooster);

// Get Booster by ID
router.get('/boosters/:boosterId', BoosterController.getBooster);

// Get Boosters by User
router.get('/boosters/user/:userId', BoosterController.getBoostersByUser);

// Update Booster
router.put('/boosters/:boosterId', BoosterController.updateBooster);

// Delete Booster
router.delete('/boosters/:boosterId', BoosterController.deleteBooster);

export default router;
