import * as FakeModel from '../models/FakeModel';

export async function createFake(req, res) {
    const { userId, senderId } = req.body;

    try {
        const fakeId = await FakeModel.createFake(userId, senderId);
        res.status(201).json({ status: 201, message: 'Fake entry created successfully', data: { id: fakeId } });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error creating Fake entry', error: error.message, data: null });
    }
}

export async function getFake(req, res) {
    const { fakeId } = req.params;

    try {
        const fake = await FakeModel.getFakeById(fakeId);
        res.status(200).json({ status: 200, message: 'Fake entry retrieved successfully', data: fake });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error retrieving Fake entry', error: error.message, data: null });
    }
}

export async function getAllFakesByUser(req, res) {
    const { userId } = req.params;

    try {
        const fakes = await FakeModel.getAllFakesByUserId(userId);
        res.status(200).json({ status: 200, message: 'Fake entries retrieved successfully', data: fakes });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error retrieving Fake entries', error: error.message, data: null });
    }
}

export async function updateFake(req, res) {
    const { fakeId } = req.params;
    const { newUserId, newSenderId } = req.body;

    try {
        await FakeModel.updateFakeById(fakeId, newUserId, newSenderId);
        res.status(200).json({ status: 200, message: 'Fake entry updated successfully', data: null });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error updating Fake entry', error: error.message, data: null });
    }
}

export async function deleteFake(req, res) {
    const { fakeId } = req.params;

    try {
        await FakeModel.deleteFakeById(fakeId);
        res.status(200).json({ status: 200, message: 'Fake entry deleted successfully', data: null });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error deleting Fake entry', error: error.message, data: null });
    }
}
