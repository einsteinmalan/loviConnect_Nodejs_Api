const connection = require('../config/database');

export async function createPersonalityTestQuestion(question, type, dataType, choices, version = '1.0.0', gender = 'man') {
    try {
        const result = await connection.query(
            'INSERT INTO personality_test_questions (question, type, `data-type`, choices, version, gender) VALUES (?, ?, ?, ?, ?, ?)',
            [question, type, dataType, JSON.stringify(choices), version, gender]
        );
        return result.insertId;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getPersonalityTestQuestionById(questionId) {
    try {
        const result = await connection.query('SELECT * FROM personality_test_questions WHERE id = ?', [questionId]);
        return result[0];
    } catch (error) {
        throw new Error(error);
    }
}

export async function getAllPersonalityTestQuestions() {
    try {
        const result = await connection.query('SELECT * FROM personality_test_questions');
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

export async function updatePersonalityTestQuestionById(
    questionId, newQuestion, newType, newDataType, newChoices, newVersion, newGender
) {
    try {
        await connection.query(
            'UPDATE personality_test_questions SET question = ?, type = ?, `data-type` = ?, ' +
            'choices = ?, version = ?, gender = ? WHERE id = ?',
            [newQuestion, newType, newDataType, JSON.stringify(newChoices), newVersion, newGender, questionId]
        );
    } catch (error) {
        throw new Error(error);
    }
}

export async function deletePersonalityTestQuestionById(questionId) {
    try {
        await connection.query('DELETE FROM personality_test_questions WHERE id = ?', [questionId]);
    } catch (error) {
        throw new Error(error);
    }
}
