const connection = require('../config/database');

export async function createBooster(userId, type = 'boost') {
    try {
        const result = await connection.query(
            'INSERT INTO booster (user_id, type) VALUES (?, ?)',
            [userId, type]
        );
        return result.insertId;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getBoosterById(boosterId) {
    try {
        const result = await connection.query('SELECT * FROM booster WHERE id = ?', [boosterId]);
        return result[0];
    } catch (error) {
        throw new Error(error);
    }
}

export async function getBoostersByUserId(userId) {
    try {
        const result = await connection.query('SELECT * FROM booster WHERE user_id = ?', [userId]);
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

export async function updateBoosterById(boosterId, newUserId, newType) {
    try {
        await connection.query(
            'UPDATE booster SET user_id = ?, type = ? WHERE id = ?',
            [newUserId, newType, boosterId]
        );
    } catch (error) {
        throw new Error(error);
    }
}

export async function deleteBoosterById(boosterId) {
    try {
        await connection.query('DELETE FROM booster WHERE id = ?', [boosterId]);
    } catch (error) {
        throw new Error(error);
    }
}
