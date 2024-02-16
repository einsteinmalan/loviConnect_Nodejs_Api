import * as BlockModel from '../models/block';

export async function createBlock(req, res) {
    const { userId, senderId } = req.body;

    try {
        const blockId = await BlockModel.createBlock(userId, senderId);
        res.status(201).json({ status: 201, message: 'Block created successfully', data: { id: blockId } });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error creating block', error: error.message, data: null });
    }
}

export async function getBlock(req, res) {
    const { blockId } = req.params;

    try {
        const block = await BlockModel.getBlockById(blockId);
        res.status(200).json({ status: 200, message: 'Block retrieved successfully', data: block });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error retrieving block', error: error.message, data: null });
    }
}

export async function getAllBlocksByUser(req, res) {
    const { userId } = req.params;

    try {
        const blocks = await BlockModel.getAllBlocksByUserId(userId);
        res.status(200).json({ status: 200, message: 'Blocks retrieved successfully', data: blocks });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error retrieving blocks', error: error.message, data: null });
    }
}

export async function updateBlock(req, res) {
    const { blockId } = req.params;
    const { newUserId, newSenderId } = req.body;

    try {
        await BlockModel.updateBlockById(blockId, newUserId, newSenderId);
        res.status(200).json({ status: 200, message: 'Block updated successfully', data: null });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error updating block', error: error.message, data: null });
    }
}

export async function deleteBlock(req, res) {
    const { blockId } = req.params;

    try {
        await BlockModel.deleteBlockById(blockId);
        res.status(200).json({ status: 200, message: 'Block deleted successfully', data: null });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error deleting block', error: error.message, data: null });
    }
}
