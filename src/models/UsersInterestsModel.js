const connection = require('../config/database');

export async function createUserInterest(userId, interestId) {
    try {
        const result = await connection.query(
            'INSERT INTO users_interests (id_user, id_interest) VALUES (?, ?)',
            [userId, interestId]
        );
        return result.insertId;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getUserInterestById(userInterestId) {
    try {
        const result = await connection.query('SELECT * FROM users_interests WHERE id = ?', [userInterestId]);
        return result[0];
    } catch (error) {
        throw new Error(error);
    }
}

export async function getAllUserInterestsByUserId(userId) {
    try {
        const result = await connection.query('SELECT * FROM users_interests WHERE id_user = ?', [userId]);
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

export async function updateUserInterestById(userInterestId, newUserId, newInterestId) {
    try {
        await connection.query(
            'UPDATE users_interests SET id_user = ?, id_interest = ? WHERE id = ?',
            [newUserId, newInterestId, userInterestId]
        );
    } catch (error) {
        throw new Error(error);
    }
}

export async function deleteUserInterestById(userInterestId) {
    try {
        await connection.query('DELETE FROM users_interests WHERE id = ?', [userInterestId]);
    } catch (error) {
        throw new Error(error);
    }
}
