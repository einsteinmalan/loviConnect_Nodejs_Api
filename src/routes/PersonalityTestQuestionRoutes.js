
import * as PersonalityTestQuestionModel from '../models/PersonalityTestQuestionModel';

export async function createPersonalityTestQuestion(req, res) {
    const { question, type, dataType, choices, version, gender } = req.body;

    try {
        const questionId = await PersonalityTestQuestionModel.createPersonalityTestQuestion(
            question, type, dataType, choices, version, gender
        );
        res.status(201).json({ status: 201, message: 'Personality test question created successfully', data: { id: questionId } });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error creating Personality test question',
            error: error.message,
            data: null
        });
    }
}

export async function getPersonalityTestQuestion(req, res) {
    const { questionId } = req.params;

    try {
        const question = await PersonalityTestQuestionModel.getPersonalityTestQuestionById(questionId);
        res.status(200).json({
            status: 200,
            message: 'Personality test question retrieved successfully',
            data: question
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error retrieving Personality test question',
            error: error.message,
            data: null
        });
    }
}

export async function getAllPersonalityTestQuestions(req, res) {
    try {
        const questions = await PersonalityTestQuestionModel.getAllPersonalityTestQuestions();
        res.status(200).json({
            status: 200,
            message: 'Personality test questions retrieved successfully',
            data: questions
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error retrieving Personality test questions',
            error: error.message,
            data: null
        });
    }
}

export async function updatePersonalityTestQuestion(req, res) {
    const { questionId } = req.params;
    const { newQuestion, newType, newDataType, newChoices, newVersion, newGender } = req.body;

    try {
        await PersonalityTestQuestionModel.updatePersonalityTestQuestionById(
            questionId, newQuestion, newType, newDataType, newChoices, newVersion, newGender
        );
        res.status(200).json({
            status: 200,
            message: 'Personality test question updated successfully',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error updating Personality test question',
            error: error.message,
            data: null
        });
    }
}

export async function deletePersonalityTestQuestion(req, res) {
    const { questionId } = req.params;

    try {
        await PersonalityTestQuestionModel.deletePersonalityTestQuestionById(questionId);
        res.status(200).json({
            status: 200,
            message: 'Personality test question deleted successfully',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error deleting Personality test question',
            error: error.message,
            data: null
        });
    }
}
