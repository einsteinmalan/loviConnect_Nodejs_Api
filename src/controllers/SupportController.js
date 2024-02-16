import * as SupportModel from '../models/SupportModel';

export async function createSupport(req, res) {
    const { userId, ticketTypeId, complaints, reply, status } = req.body;

    try {
        const supportId = await SupportModel.createSupport(userId, ticketTypeId, complaints, reply, status);
        res.status(201).json({ status: 201, message: 'Support ticket created successfully', data: { id: supportId } });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error creating Support ticket', error: error.message, data: null });
    }
}

export async function getSupport(req, res) {
    const { supportId } = req.params;

    try {
        const support = await SupportModel.getSupportById(supportId);
        res.status(200).json({ status: 200, message: 'Support ticket retrieved successfully', data: support });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error retrieving Support ticket', error: error.message, data: null });
    }
}

export async function getAllSupportsByUser(req, res) {
    const { userId } = req.params;

    try {
        const supports = await SupportModel.getAllSupportsByUserId(userId);
        res.status(200).json({ status: 200, message: 'Support tickets retrieved successfully', data: supports });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error retrieving Support tickets', error: error.message, data: null });
    }
}

export async function updateSupport(req, res) {
    const { supportId } = req.params;
    const { newUserId, newTicketTypeId, newComplaints, newReply, newStatus } = req.body;

    try {
        await SupportModel.updateSupportById(supportId, newUserId, newTicketTypeId, newComplaints, newReply, newStatus);
        res.status(200).json({ status: 200, message: 'Support ticket updated successfully', data: null });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error updating Support ticket', error: error.message, data: null });
    }
}

export async function deleteSupport(req, res) {
    const { supportId } = req.params;

    try {
        await SupportModel.deleteSupportById(supportId);
        res.status(200).json({ status: 200, message: 'Support ticket deleted successfully', data: null });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error deleting Support ticket', error: error.message, data: null });
    }
}
