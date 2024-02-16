import * as UsersInterestsModel from '../models/UsersInterestsModel';

export async function createUserInterest(req, res) {
    const { userId, interestId } = req.body;

    try {
        const userInterestId = await UsersInterestsModel.createUserInterest(userId, interestId);
        res.status(201).json({
            status: 201,
            message: 'User Interest created successfully',
            data: { id: userInterestId }
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error creating User Interest',
            error: error.message,
            data: null
        });
    }
}

export async function getUserInterest(req, res) {
    const { userInterestId } = req.params;

    try {
        const userInterest = await UsersInterestsModel.getUserInterestById(userInterestId);
        res.status(200).json({
            status: 200,
            message: 'User Interest retrieved successfully',
            data: userInterest
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error retrieving User Interest',
            error: error.message,
            data: null
        });
    }
}

export async function getAllUserInterestsByUser(req, res) {
    const { userId } = req.params;

    try {
        const userInterests = await UsersInterestsModel.getAllUserInterestsByUserId(userId);
        res.status(200).json({
            status: 200,
            message: 'User Interests retrieved successfully',
            data: userInterests
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error retrieving User Interests',
            error: error.message,
            data: null
        });
    }
}

export async function updateUserInterest(req, res) {
    const { userInterestId } = req.params;
    const { newUserId, newInterestId } = req.body;

    try {
        await UsersInterestsModel.updateUserInterestById(userInterestId, newUserId, newInterestId);
        res.status(200).json({
            status: 200,
            message: 'User Interest updated successfully',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error updating User Interest',
            error: error.message,
            data: null
        });
    }
}

export async function deleteUserInterest(req, res) {
    const { userInterestId } = req.params;

    try {
        await UsersInterestsModel.deleteUserInterestById(userInterestId);
        res.status(200).json({
            status: 200,
            message: 'User Interest deleted successfully',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error deleting User Interest',
            error: error.message,
            data: null
        });
    }
}
