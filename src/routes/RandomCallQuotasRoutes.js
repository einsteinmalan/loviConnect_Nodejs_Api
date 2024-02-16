import express from 'express';
import * as RandomCallQuotasController from '../controllers/RandomCallQuotasController';

const router = express.Router();

// Create Random Call Quota
router.post('/random-call-quotas', RandomCallQuotasController.createRandomCallQuota);

// Get Random Call Quota by ID
router.get('/random-call-quotas/:quotaId', RandomCallQuotasController.getRandomCallQuota);

// Get Random Call Quota by User
router.get('/random-call-quotas/user/:userId', RandomCallQuotasController.getRandomCallQuotaByUser);

// Update Random Call Quota
router.put('/random-call-quotas/:quotaId', RandomCallQuotasController.updateRandomCallQuota);

// Delete Random Call Quota
router.delete('/random-call-quotas/:quotaId', RandomCallQuotasController.deleteRandomCallQuota);

export default router;
