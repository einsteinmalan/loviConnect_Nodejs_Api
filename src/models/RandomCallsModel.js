const connection = require('../config/database');

export async function createRandomCall(userId, calledId, status = 'failed') {
    try {
        const result = await connection.query(
            'INSERT INTO random_calls (user_id, called_id, status) VALUES (?, ?, ?)',
            [userId, calledId, status]
        );
        return result.insertId;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getRandomCallById(callId) {
    try {
        const result = await connection.query('SELECT * FROM random_calls WHERE id = ?', [callId]);
        return result[0];
    } catch (error) {
        throw new Error(error);
    }
}

export async function getAllRandomCallsByUserId(userId) {
    try {
        const result = await connection.query('SELECT * FROM random_calls WHERE user_id = ?', [userId]);
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

export async function updateRandomCallById(callId, newUserId, newCalledId, newStatus) {
    try {
        await connection.query(
            'UPDATE random_calls SET user_id = ?, called_id = ?, status = ? WHERE id = ?',
            [newUserId, newCalledId, newStatus, callId]
        );
    } catch (error) {
        throw new Error(error);
    }
}

export async function deleteRandomCallById(callId) {
    try {
        await connection.query('DELETE FROM random_calls WHERE id = ?', [callId]);
    } catch (error) {
        throw new Error(error);
    }
}
