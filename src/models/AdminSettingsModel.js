const connection = require("../config/database");
const uuid = require("uuid");
const id = uuid.v4();

export async function createAdminSettings(
  appVersion = "1.0.0",
  maintenanceActive = 0,
) {
  try {
    const result = await connection.query(
      "INSERT INTO admin_settings (id, app_version, maintenance_active) VALUES (?, ?, ?)",
      [id, appVersion, maintenanceActive],
      (error, result) => {
        if (error) {
          return { error: error };
        } else {
          return id;
        }
      },
    );
    //return result.insertId;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAdminSettingsById(adminSettingsId) {
  try {
    const result = await connection.query(
      "SELECT * FROM admin_settings WHERE id = ?",
      [adminSettingsId],
      (error, result) => {
        if (error) {
          return { error: error };
        } else {
          return result[0];
        }
      },
    );
    //return result[0];
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateAdminSettingsById(
  adminSettingsId,
  newAppVersion,
  newMaintenanceActive,
) {
  try {
    await connection.query(
      "UPDATE admin_settings SET app_version = ?, maintenance_active = ? WHERE id = ?",
      [newAppVersion, newMaintenanceActive, adminSettingsId],
      (error, result) => {
        if (error) {
          return { error: error };
        } else {
          return result;
        }
      },
    );
  } catch (error) {
    throw new Error(error);
  }
}
