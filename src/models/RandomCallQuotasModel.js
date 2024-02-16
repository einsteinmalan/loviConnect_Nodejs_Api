const connection = require('../config/database');

export async function createRandomCallQuota(userId, quotaLeft = 0) {
    try {
        const result = await connection.query(
            'INSERT INTO random_call_quotas (user_id, quota_left) VALUES (?, ?)',
            [userId, quotaLeft]
        );
        return result.insertId;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getRandomCallQuotaById(quotaId) {
    try {
        const result = await connection.query('SELECT * FROM random_call_quotas WHERE id = ?', [quotaId]);
        return result[0];
    } catch (error) {
        throw new Error(error);
    }
}

export async function getRandomCallQuotaByUserId(userId) {
    try {
        const result = await connection.query('SELECT * FROM random_call_quotas WHERE user_id = ?', [userId]);
        return result[0];
    } catch (error) {
        throw new Error(error);
    }
}

export async function updateRandomCallQuotaById(quotaId, newUserId, newQuotaLeft) {
    try {
        await connection.query(
            'UPDATE random_call_quotas SET user_id = ?, quota_left = ? WHERE id = ?',
            [newUserId, newQuotaLeft, quotaId]
        );
    } catch (error) {
        throw new Error(error);
    }
}

export async function deleteRandomCallQuotaById(quotaId) {
    try {
        await connection.query('DELETE FROM random_call_quotas WHERE id = ?', [quotaId]);
    } catch (error) {
        throw new Error(error);
    }
}
