import * as RandomCallsModel from '../models/RandomCallsModel';

export async function createRandomCall(req, res) {
    const { userId, calledId, status } = req.body;

    try {
        const callId = await RandomCallsModel.createRandomCall(userId, calledId, status);
        res.status(201).json({
            status: 201,
            message: 'Random Call created successfully',
            data: { id: callId }
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error creating Random Call',
            error: error.message,
            data: null
        });
    }
}

export async function getRandomCall(req, res) {
    const { callId } = req.params;

    try {
        const call = await RandomCallsModel.getRandomCallById(callId);
        res.status(200).json({
            status: 200,
            message: 'Random Call retrieved successfully',
            data: call
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error retrieving Random Call',
            error: error.message,
            data: null
        });
    }
}

export async function getAllRandomCallsByUser(req, res) {
    const { userId } = req.params;

    try {
        const calls = await RandomCallsModel.getAllRandomCallsByUserId(userId);
        res.status(200).json({
            status: 200,
            message: 'Random Calls retrieved successfully',
            data: calls
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error retrieving Random Calls',
            error: error.message,
            data: null
        });
    }
}

export async function updateRandomCall(req, res) {
    const { callId } = req.params;
    const { newUserId, newCalledId, newStatus } = req.body;

    try {
        await RandomCallsModel.updateRandomCallById(callId, newUserId, newCalledId, newStatus);
        res.status(200).json({
            status: 200,
            message: 'Random Call updated successfully',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error updating Random Call',
            error: error.message,
            data: null
        });
    }
}

export async function deleteRandomCall(req, res) {
    const { callId } = req.params;

    try {
        await RandomCallsModel.deleteRandomCallById(callId);
        res.status(200).json({
            status: 200,
            message: 'Random Call deleted successfully',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error deleting Random Call',
            error: error.message,
            data: null
        });
    }
}
