const connection = require('../config/database');

export async function createInviteDatingsQuota(userId, quotaLeft = 0) {
    try {
        const result = await connection.query(
            'INSERT INTO invite_datings_quotas (user_id, quota_left) VALUES (?, ?)',
            [userId, quotaLeft]
        );
        return result.insertId;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getInviteDatingsQuotaById(quotaId) {
    try {
        const result = await connection.query('SELECT * FROM invite_datings_quotas WHERE id = ?', [quotaId]);
        return result[0];
    } catch (error) {
        throw new Error(error);
    }
}

export async function getInviteDatingsQuotaByUserId(userId) {
    try {
        const result = await connection.query('SELECT * FROM invite_datings_quotas WHERE user_id = ?', [userId]);
        return result[0];
    } catch (error) {
        throw new Error(error);
    }
}

export async function updateInviteDatingsQuotaById(quotaId, newUserId, newQuotaLeft) {
    try {
        await connection.query(
            'UPDATE invite_datings_quotas SET user_id = ?, quota_left = ? WHERE id = ?',
            [newUserId, newQuotaLeft, quotaId]
        );
    } catch (error) {
        throw new Error(error);
    }
}

export async function deleteInviteDatingsQuotaById(quotaId) {
    try {
        await connection.query('DELETE FROM invite_datings_quotas WHERE id = ?', [quotaId]);
    } catch (error) {
        throw new Error(error);
    }
}
