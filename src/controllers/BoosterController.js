import * as BoosterModel from '../models/BoosterModel';

export async function createBooster(req, res) {
    const { userId, type } = req.body;

    try {
        const boosterId = await BoosterModel.createBooster(userId, type);
        res.status(201).json({
            status: 201,
            message: 'Booster created successfully',
            data: { id: boosterId }
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error creating Booster',
            error: error.message,
            data: null
        });
    }
}

export async function getBooster(req, res) {
    const { boosterId } = req.params;

    try {
        const booster = await BoosterModel.getBoosterById(boosterId);
        res.status(200).json({
            status: 200,
            message: 'Booster retrieved successfully',
            data: booster
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error retrieving Booster',
            error: error.message,
            data: null
        });
    }
}

export async function getBoostersByUser(req, res) {
    const { userId } = req.params;

    try {
        const boosters = await BoosterModel.getBoostersByUserId(userId);
        res.status(200).json({
            status: 200,
            message: 'Boosters retrieved successfully',
            data: boosters
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error retrieving Boosters',
            error: error.message,
            data: null
        });
    }
}

export async function updateBooster(req, res) {
    const { boosterId } = req.params;
    const { newUserId, newType } = req.body;

    try {
        await BoosterModel.updateBoosterById(boosterId, newUserId, newType);
        res.status(200).json({
            status: 200,
            message: 'Booster updated successfully',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error updating Booster',
            error: error.message,
            data: null
        });
    }
}

export async function deleteBooster(req, res) {
    const { boosterId } = req.params;

    try {
        await BoosterModel.deleteBoosterById(boosterId);
        res.status(200).json({
            status: 200,
            message: 'Booster deleted successfully',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error deleting Booster',
            error: error.message,
            data: null
        });
    }
}
