import * as InviteDatingsModel from '../models/InviteDatingsModel';

export async function createInviteDating(req, res) {
    const { userId, invitedId, isActive, isCompleted } = req.body;

    try {
        const inviteId = await InviteDatingsModel.createInviteDating(userId, invitedId, isActive, isCompleted);
        res.status(201).json({
            status: 201,
            message: 'Invite Dating created successfully',
            data: { id: inviteId }
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error creating Invite Dating',
            error: error.message,
            data: null
        });
    }
}

export async function getInviteDating(req, res) {
    const { inviteId } = req.params;

    try {
        const invite = await InviteDatingsModel.getInviteDatingById(inviteId);
        res.status(200).json({
            status: 200,
            message: 'Invite Dating retrieved successfully',
            data: invite
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error retrieving Invite Dating',
            error: error.message,
            data: null
        });
    }
}

export async function getAllInviteDatingsByUser(req, res) {
    const { userId } = req.params;

    try {
        const invites = await InviteDatingsModel.getAllInviteDatingsByUserId(userId);
        res.status(200).json({
            status: 200,
            message: 'Invite Datings retrieved successfully',
            data: invites
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error retrieving Invite Datings',
            error: error.message,
            data: null
        });
    }
}

export async function updateInviteDating(req, res) {
    const { inviteId } = req.params;
    const { newUserId, newInvitedId, newIsActive, newIsCompleted } = req.body;

    try {
        await InviteDatingsModel.updateInviteDatingById(
            inviteId, newUserId, newInvitedId, newIsActive, newIsCompleted
        );
        res.status(200).json({
            status: 200,
            message: 'Invite Dating updated successfully',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error updating Invite Dating',
            error: error.message,
            data: null
        });
    }
}

export async function deleteInviteDating(req, res) {
    const { inviteId } = req.params;

    try {
        await InviteDatingsModel.deleteInviteDatingById(inviteId);
        res.status(200).json({
            status: 200,
            message: 'Invite Dating deleted successfully',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error deleting Invite Dating',
            error: error.message,
            data: null
        });
    }
}
