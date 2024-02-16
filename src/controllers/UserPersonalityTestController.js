import * as UserPersonalityTestModel from '../models/UserPersonalityTestModel';

export async function createUserPersonalityTest(req, res) {
    const { userId, content, version } = req.body;

    try {
        const testId = await UserPersonalityTestModel.createUserPersonalityTest(userId, content, version);
        res.status(201).json({
            status: 201,
            message: 'User Personality test created successfully',
            data: { id: testId }
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error creating User Personality test',
            error: error.message,
            data: null
        });
    }
}

export async function getUserPersonalityTest(req, res) {
    const { testId } = req.params;

    try {
        const test = await UserPersonalityTestModel.getUserPersonalityTestById(testId);
        res.status(200).json({
            status: 200,
            message: 'User Personality test retrieved successfully',
            data: test
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error retrieving User Personality test',
            error: error.message,
            data: null
        });
    }
}

export async function getAllUserPersonalityTestsByUser(req, res) {
    const { userId } = req.params;

    try {
        const tests = await UserPersonalityTestModel.getAllUserPersonalityTestsByUserId(userId);
        res.status(200).json({
            status: 200,
            message: 'User Personality tests retrieved successfully',
            data: tests
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error retrieving User Personality tests',
            error: error.message,
            data: null
        });
    }
}

export async function updateUserPersonalityTest(req, res) {
    const { testId } = req.params;
    const { newUserId, newContent, newVersion } = req.body;

    try {
        await UserPersonalityTestModel.updateUserPersonalityTestById(
            testId, newUserId, newContent, newVersion
        );
        res.status(200).json({
            status: 200,
            message: 'User Personality test updated successfully',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error updating User Personality test',
            error: error.message,
            data: null
        });
    }
}

export async function deleteUserPersonalityTest(req, res) {
    const { testId } = req.params;

    try {
        await UserPersonalityTestModel.deleteUserPersonalityTestById(testId);
        res.status(200).json({
            status: 200,
            message: 'User Personality test deleted successfully',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error deleting User Personality test',
            error: error.message,
            data: null
        });
    }
}
