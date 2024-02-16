const connection = require('../config/database');

export async function createVersusLost(chooserId, userId, winIds = []) {
    try {
        const result = await connection.query(
            'INSERT INTO versus_losts (chooser_id, user_id, win_id) VALUES (?, ?, ?)',
            [chooserId, userId, JSON.stringify(winIds)]
        );
        return result.insertId;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getVersusLostById(versusLostId) {
    try {
        const result = await connection.query('SELECT * FROM versus_losts WHERE id = ?', [versusLostId]);
        return result[0];
    } catch (error) {
        throw new Error(error);
    }
}

export async function getVersusLostsByChooserId(chooserId) {
    try {
        const result = await connection.query('SELECT * FROM versus_losts WHERE chooser_id = ?', [chooserId]);
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

export async function updateVersusLostById(versusLostId, newChooserId, newUserId, newWinIds) {
    try {
        await connection.query(
            'UPDATE versus_losts SET chooser_id = ?, user_id = ?, win_id = ? WHERE id = ?',
            [newChooserId, newUserId, JSON.stringify(newWinIds), versusLostId]
        );
    } catch (error) {
        throw new Error(error);
    }
}

export async function deleteVersusLostById(versusLostId) {
    try {
        await connection.query('DELETE FROM versus_losts WHERE id = ?', [versusLostId]);
    } catch (error) {
        throw new Error(error);
    }
}
