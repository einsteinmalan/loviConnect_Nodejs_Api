const connection = require('../config/database');

export async function createFake(userId, senderId) {
    try {
        const result = await connection.query('INSERT INTO fakes (id_user, id_sender) VALUES (?, ?)', [userId, senderId]);
        return result.insertId;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getFakeById(fakeId) {
    try {
        const result = await connection.query('SELECT * FROM fakes WHERE id_fake = ?', [fakeId]);
        return result[0];
    } catch (error) {
        throw new Error(error);
    }
}

export async function getAllFakesByUserId(userId) {
    try {
        const result = await connection.query('SELECT * FROM fakes WHERE id_user = ?', [userId]);
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

export async function updateFakeById(fakeId, newUserId, newSenderId) {
    try {
        await connection.query('UPDATE fakes SET id_user = ?, id_sender = ? WHERE id_fake = ?', [newUserId, newSenderId, fakeId]);
    } catch (error) {
        throw new Error(error);
    }
}

export async function deleteFakeById(fakeId) {
    try {
        await connection.query('DELETE FROM fakes WHERE id_fake = ?', [fakeId]);
    } catch (error) {
        throw new Error(error);
    }
}
