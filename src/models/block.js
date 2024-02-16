const connection = require('../config/database');

export async function createBlock(userId, senderId) {
    try {
        const result = await connection.query('INSERT INTO blocks (id_user, id_sender) VALUES (?, ?)', [userId, senderId]);
        return result.insertId;
    } catch (err) {
        throw new Error(err);
    }
}

export async function getBlockById(blockId) {
    try {
        const result = await connection.query('SELECT * FROM blocks WHERE id_block = ?', [blockId]);
        return result[0];
    } catch (err) {
        throw new Error(err);
    }
}

export async function getAllBlocksByUserId(userId) {
    try {
        const result = await connection.query('SELECT * FROM blocks WHERE id_user = ?', [userId]);
        return result;
    } catch (err) {
        throw new Error(err);
    }
}

export async function updateBlockById(blockId, newUserId, newSenderId) {
    try {
        await connection.query('UPDATE blocks SET id_user = ?, id_sender = ? WHERE id_block = ?', [newUserId, newSenderId, blockId]);
    } catch (err) {
        throw new Error(err);
    }
}

export async function deleteBlockById(blockId) {
    try {
        await connection.query('DELETE FROM blocks WHERE id_block = ?', [blockId]);
    } catch (err) {
        throw new Error(err);
    }
}
