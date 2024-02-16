import * as SysBlockModel from '../models/SysBlockModel';

export async function createSysBlock(req, res) {
    const { userId, reason } = req.body;

    try {
        const sysBlockId = await SysBlockModel.createSysBlock(userId, reason);
        res.status(201).json({ status: 201, message: 'System Block created successfully', data: { id: sysBlockId } });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error creating System Block', error: error.message, data: null });
    }
}

export async function getSysBlock(req, res) {
    const { sysBlockId } = req.params;

    try {
        const sysBlock = await SysBlockModel.getSysBlockById(sysBlockId);
        res.status(200).json({ status: 200, message: 'System Block retrieved successfully', data: sysBlock });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error retrieving System Block', error: error.message, data: null });
    }
}

export async function getAllSysBlocksByUser(req, res) {
    const { userId } = req.params;

    try {
        const sysBlocks = await SysBlockModel.getAllSysBlocksByUserId(userId);
        res.status(200).json({ status: 200, message: 'System Blocks retrieved successfully', data: sysBlocks });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error retrieving System Blocks', error: error.message, data: null });
    }
}

export async function updateSysBlock(req, res) {
    const { sysBlockId } = req.params;
    const { newUserId, newReason } = req.body;

    try {
        await SysBlockModel.updateSysBlockById(sysBlockId, newUserId, newReason);
        res.status(200).json({ status: 200, message: 'System Block updated successfully', data: null });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error updating System Block', error: error.message, data: null });
    }
}

export async function deleteSysBlock(req, res) {
    const { sysBlockId } = req.params;

    try {
        await SysBlockModel.deleteSysBlockById(sysBlockId);
        res.status(200).json({ status: 200, message: 'System Block deleted successfully', data: null });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error deleting System Block', error: error.message, data: null });
    }
}
