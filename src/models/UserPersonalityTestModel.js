const connection = require('../config/database');

export async function createUserPersonalityTest(userId, content, version = '1.0.0') {
    try {
        const result = await connection.query(
            'INSERT INTO user_personality_test (user_id, content, version) VALUES (?, ?, ?)',
            [userId, JSON.stringify(content), version]
        );
        return result.insertId;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getUserPersonalityTestById(testId) {
    try {
        const result = await connection.query('SELECT * FROM user_personality_test WHERE id = ?', [testId]);
        return result[0];
    } catch (error) {
        throw new Error(error);
    }
}

export async function getAllUserPersonalityTestsByUserId(userId) {
    try {
        const result = await connection.query('SELECT * FROM user_personality_test WHERE user_id = ?', [userId]);
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

export async function updateUserPersonalityTestById(testId, newUserId, newContent, newVersion) {
    try {
        await connection.query(
            'UPDATE user_personality_test SET user_id = ?, content = ?, version = ? WHERE id = ?',
            [newUserId, JSON.stringify(newContent), newVersion, testId]
        );
    } catch (error) {
        throw new Error(error);
    }
}

export async function deleteUserPersonalityTestById(testId) {
    try {
        await connection.query('DELETE FROM user_personality_test WHERE id = ?', [testId]);
    } catch (error) {
        throw new Error(error);
    }
}