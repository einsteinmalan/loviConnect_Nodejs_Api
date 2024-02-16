import * as VersusWinsModel from '../models/VersusWinsModel';

export async function createVersusWin(req, res) {
    const { userId, chooserId, lostIds } = req.body;

    try {
        const versusWinId = await VersusWinsModel.createVersusWin(userId, chooserId, lostIds);
        res.status(201).json({
            status: 201,
            message: 'Versus Win created successfully',
            data: { id: versusWinId }
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error creating Versus Win',
            error: error.message,
            data: null
        });
    }
}

export async function getVersusWin(req, res) {
    const { versusWinId } = req.params;

    try {
        const versusWin = await VersusWinsModel.getVersusWinById(versusWinId);
        res.status(200).json({
            status: 200,
            message: 'Versus Win retrieved successfully',
            data: versusWin
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error retrieving Versus Win',
            error: error.message,
            data: null
        });
    }
}

export async function getVersusWinsByUser(req, res) {
    const { userId } = req.params;

    try {
        const versusWins = await VersusWinsModel.getVersusWinsByUserId(userId);
        res.status(200).json({
            status: 200,
            message: 'Versus Wins retrieved successfully',
            data: versusWins
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error retrieving Versus Wins',
            error: error.message,
            data: null
        });
    }
}

export async function updateVersusWin(req, res) {
    const { versusWinId } = req.params;
    const { newUserId, newChooserId, newLostIds } = req.body;

    try {
        await VersusWinsModel.updateVersusWinById(versusWinId, newUserId, newChooserId, newLostIds);
        res.status(200).json({
            status: 200,
            message: 'Versus Win updated successfully',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error updating Versus Win',
            error: error.message,
            data: null
        });
    }
}

export async function deleteVersusWin(req, res) {
    const { versusWinId } = req.params;

    try {
        await VersusWinsModel.deleteVersusWinById(versusWinId);
        res.status(200).json({
            status: 200,
            message: 'Versus Win deleted successfully',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error deleting Versus Win',
            error: error.message,
            data: null
        });
    }
}
