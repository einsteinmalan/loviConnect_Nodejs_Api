import * as VersusLostsModel from '../models/VersusLostsModel';

export async function createVersusLost(req, res) {
    const { chooserId, userId, winIds } = req.body;

    try {
        const versusLostId = await VersusLostsModel.createVersusLost(chooserId, userId, winIds);
        res.status(201).json({
            status: 201,
            message: 'Versus Lost created successfully',
            data: { id: versusLostId }
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error creating Versus Lost',
            error: error.message,
            data: null
        });
    }
}

export async function getVersusLost(req, res) {
    const { versusLostId } = req.params;

    try {
        const versusLost = await VersusLostsModel.getVersusLostById(versusLostId);
        res.status(200).json({
            status: 200,
            message: 'Versus Lost retrieved successfully',
            data: versusLost
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error retrieving Versus Lost',
            error: error.message,
            data: null
        });
    }
}

export async function getVersusLostsByChooser(req, res) {
    const { chooserId } = req.params;

    try {
        const versusLosts = await VersusLostsModel.getVersusLostsByChooserId(chooserId);
        res.status(200).json({
            status: 200,
            message: 'Versus Losts retrieved successfully',
            data: versusLosts
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error retrieving Versus Losts',
            error: error.message,
            data: null
        });
    }
}

export async function updateVersusLost(req, res) {
    const { versusLostId } = req.params;
    const { newChooserId, newUserId, newWinIds } = req.body;

    try {
        await VersusLostsModel.updateVersusLostById(versusLostId, newChooserId, newUserId, newWinIds);
        res.status(200).json({
            status: 200,
            message: 'Versus Lost updated successfully',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error updating Versus Lost',
            error: error.message,
            data: null
        });
    }
}

export async function deleteVersusLost(req, res) {
    const { versusLostId } = req.params;

    try {
        await VersusLostsModel.deleteVersusLostById(versusLostId);
        res.status(200).json({
            status: 200,
            message: 'Versus Lost deleted successfully',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error deleting Versus Lost',
            error: error.message,
            data: null
        });
    }
}
