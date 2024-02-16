const connection = require('../config/database');

export async function createUserSettings(userId, receivePush = 'Yes', allowRandomCall = 'Yes', allowBlindDate = 'Yes', hibernateAccount = 'No', goIncognito = 'No') {
    try {
        const result = await connection.query(
            'INSERT INTO user_settings (user_id, receive_push, allow_random_call, allow_blind_date, hibernate_account, go_incognito) VALUES (?, ?, ?, ?, ?, ?)',
            [userId, receivePush, allowRandomCall, allowBlindDate, hibernateAccount, goIncognito]
        );
        return result.insertId;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getUserSettingsById(settingsId) {
    try {
        const result = await connection.query('SELECT * FROM user_settings WHERE id = ?', [settingsId]);
        return result[0];
    } catch (error) {
        throw new Error(error);
    }
}

export async function getUserSettingsByUserId(userId) {
    try {
        const result = await connection.query('SELECT * FROM user_settings WHERE user_id = ?', [userId]);
        return result[0];
    } catch (error) {
        throw new Error(error);
    }
}

export async function updateUserSettingsById(settingsId, newUserId, newReceivePush, newAllowRandomCall, newAllowBlindDate, newHibernateAccount, newGoIncognito) {
    try {
        await connection.query(
            'UPDATE user_settings SET user_id = ?, receive_push = ?, allow_random_call = ?, allow_blind_date = ?, hibernate_account = ?, go_incognito = ? WHERE id = ?',
            [newUserId, newReceivePush, newAllowRandomCall, newAllowBlindDate, newHibernateAccount, newGoIncognito, settingsId]
        );
    } catch (error) {
        throw new Error(error);
    }
}

export async function deleteUserSettingsById(settingsId) {
    try {
        await connection.query('DELETE FROM user_settings WHERE id = ?', [settingsId]);
    } catch (error) {
        throw new Error(error);
    }
}
