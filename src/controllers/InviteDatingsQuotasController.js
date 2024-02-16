import * as InviteDatingsQuotasModel from '../models/InviteDatingsQuotasModel';

export async function createInviteDatingsQuota(req, res) {
    const { userId, quotaLeft } = req.body;

    try {
        const quotaId = await InviteDatingsQuotasModel.createInviteDatingsQuota(userId, quotaLeft);
        res.status(201).json({
            status: 201,
            message: 'Invite Datings Quota created successfully',
            data: { id: quotaId }
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error creating Invite Datings Quota',
            error: error.message,
            data: null
        });
    }
}

export async function getInviteDatingsQuota(req, res) {
    const { quotaId } = req.params;

    try {
        const quota = await InviteDatingsQuotasModel.getInviteDatingsQuotaById(quotaId);
        res.status(200).json({
            status: 200,
            message: 'Invite Datings Quota retrieved successfully',
            data: quota
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error retrieving Invite Datings Quota',
            error: error.message,
            data: null
        });
    }
}

export async function getInviteDatingsQuotaByUser(req, res) {
    const { userId } = req.params;

    try {
        const quota = await InviteDatingsQuotasModel.getInviteDatingsQuotaByUserId(userId);
        res.status(200).json({
            status: 200,
            message: 'Invite Datings Quota retrieved successfully',
            data: quota
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error retrieving Invite Datings Quota',
            error: error.message,
            data: null
        });
    }
}

export async function updateInviteDatingsQuota(req, res) {
    const { quotaId } = req.params;
    const { newUserId, newQuotaLeft } = req.body;

    try {
        await InviteDatingsQuotasModel.updateInviteDatingsQuotaById(quotaId, newUserId, newQuotaLeft);
        res.status(200).json({
            status: 200,
            message: 'Invite Datings Quota updated successfully',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error updating Invite Datings Quota',
            error: error.message,
            data: null
        });
    }
}

export async function deleteInviteDatingsQuota(req, res) {
    const { quotaId } = req.params;

    try {
        await InviteDatingsQuotasModel.deleteInviteDatingsQuotaById(quotaId);
        res.status(200).json({
            status: 200,
            message: 'Invite Datings Quota deleted successfully',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error deleting Invite Datings Quota',
            error: error.message,
            data: null
        });
    }
}
