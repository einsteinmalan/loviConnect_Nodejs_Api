const connection = require('../config/database');

export async function createAdminSettings(appVersion = '1.0.0', maintenanceActive = 0) {
    try {
        const result = await connection.query(
            'INSERT INTO admin_settings (app_version, maintenance_active) VALUES (?, ?)',
            [appVersion, maintenanceActive]
        );
        return result.insertId;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getAdminSettingsById(adminSettingsId) {
    try {
        const result = await connection.query('SELECT * FROM admin_settings WHERE id = ?', [adminSettingsId]);
        return result[0];
    } catch (error) {
        throw new Error(error);
    }
}

export async function updateAdminSettingsById(adminSettingsId, newAppVersion, newMaintenanceActive) {
    try {
        await connection.query(
            'UPDATE admin_settings SET app_version = ?, maintenance_active = ? WHERE id = ?',
            [newAppVersion, newMaintenanceActive, adminSettingsId]
        );
    } catch (error) {
        throw new Error(error);
    }
}
