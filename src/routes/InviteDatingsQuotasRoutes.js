import express from 'express';
import * as InviteDatingsQuotasController from '../controllers/InviteDatingsQuotasController';

const router = express.Router();

// Create Invite Datings Quota
router.post('/invite-datings-quotas', InviteDatingsQuotasController.createInviteDatingsQuota);

// Get Invite Datings Quota by ID
router.get('/invite-datings-quotas/:quotaId', InviteDatingsQuotasController.getInviteDatingsQuota);

// Get Invite Datings Quota by User
router.get('/invite-datings-quotas/user/:userId', InviteDatingsQuotasController.getInviteDatingsQuotaByUser);

// Update Invite Datings Quota
router.put('/invite-datings-quotas/:quotaId', InviteDatingsQuotasController.updateInviteDatingsQuota);

// Delete Invite Datings Quota
router.delete('/invite-datings-quotas/:quotaId', InviteDatingsQuotasController.deleteInviteDatingsQuota);

export default router;
