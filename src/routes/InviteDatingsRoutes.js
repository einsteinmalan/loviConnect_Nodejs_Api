import express from 'express';
import * as InviteDatingsController from '../controllers/InviteDatingsController';

const router = express.Router();

// Create Invite Dating
router.post('/invite-datings', InviteDatingsController.createInviteDating);

// Get Invite Dating by ID
router.get('/invite-datings/:inviteId', InviteDatingsController.getInviteDating);

// Get all Invite Datings for a user
router.get('/invite-datings/user/:userId', InviteDatingsController.getAllInviteDatingsByUser);

// Update Invite Dating
router.put('/invite-datings/:inviteId', InviteDatingsController.updateInviteDating);

// Delete Invite Dating
router.delete('/invite-datings/:inviteId', InviteDatingsController.deleteInviteDating);

export default router;
