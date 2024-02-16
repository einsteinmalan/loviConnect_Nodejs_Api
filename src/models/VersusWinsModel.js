const connection = require('../config/database');

export async function createVersusWin(userId, chooserId, lostIds = []) {
    try {
        const result = await connection.query(
            'INSERT INTO versus_wins (user_id, chooser_id, lost_id) VALUES (?, ?, ?)',
            [userId, chooserId, JSON.stringify(lostIds)]
        );
        return result.insertId;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getVersusWinById(versusWinId) {
    try {
        const result = await connection.query('SELECT * FROM versus_wins WHERE id = ?', [versusWinId]);
        return result[0];
    } catch (error) {
        throw new Error(error);
    }
}

export async function getVersusWinsByUserId(userId) {
    try {
        const result = await connection.query('SELECT * FROM versus_wins WHERE user_id = ?', [userId]);
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

export async function updateVersusWinById(versusWinId, newUserId, newChooserId, newLostIds) {
    try {
        await connection.query(
            'UPDATE versus_wins SET user_id = ?, chooser_id = ?, lost_id = ? WHERE id = ?',
            [newUserId, newChooserId, JSON.stringify(newLostIds), versusWinId]
        );
    } catch (error) {
        throw new Error(error);
    }
}

export async function deleteVersusWinById(versusWinId) {
    try {
        await connection.query('DELETE FROM versus_wins WHERE id = ?', [versusWinId]);
    } catch (error) {
        throw new Error(error);
    }
}
