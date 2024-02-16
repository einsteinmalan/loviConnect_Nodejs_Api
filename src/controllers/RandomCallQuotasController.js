import * as RandomCallQuotasModel from '../models/RandomCallQuotasModel';

export async function createRandomCallQuota(req, res) {
    const { userId, quotaLeft } = req.body;

    try {
        const quotaId = await RandomCallQuotasModel.createRandomCallQuota(userId, quotaLeft);
        res.status(201).json({
            status: 201,
            message: 'Random Call Quota created successfully',
            data: { id: quotaId }
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error creating Random Call Quota',
            error: error.message,
            data: null
        });
    }
}

export async function getRandomCallQuota(req, res) {
    const { quotaId } = req.params;

    try {
        const quota = await RandomCallQuotasModel.getRandomCallQuotaById(quotaId);
        res.status(200).json({
            status: 200,
            message: 'Random Call Quota retrieved successfully',
            data: quota
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error retrieving Random Call Quota',
            error: error.message,
            data: null
        });
    }
}

export async function getRandomCallQuotaByUser(req, res) {
    const { userId } = req.params;

    try {
        const quota = await RandomCallQuotasModel.getRandomCallQuotaByUserId(userId);
        res.status(200).json({
            status: 200,
            message: 'Random Call Quota retrieved successfully',
            data: quota
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error retrieving Random Call Quota',
            error: error.message,
            data: null
        });
    }
}

export async function updateRandomCallQuota(req, res) {
    const { quotaId } = req.params;
    const { newUserId, newQuotaLeft } = req.body;

    try {
        await RandomCallQuotasModel.updateRandomCallQuotaById(quotaId, newUserId, newQuotaLeft);
        res.status(200).json({
            status: 200,
            message: 'Random Call Quota updated successfully',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error updating Random Call Quota',
            error: error.message,
            data: null
        });
    }
}

export async function deleteRandomCallQuota(req, res) {
    const { quotaId } = req.params;

    try {
        await RandomCallQuotasModel.deleteRandomCallQuotaById(quotaId);
        res.status(200).json({
            status: 200,
            message: 'Random Call Quota deleted successfully',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error deleting Random Call Quota',
            error: error.message,
            data: null
        });
    }
}
