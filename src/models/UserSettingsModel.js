const connection = require("../config/database");
const uuid = require("uuid");
const id = uuid.v4();

export async function createUserSettings(
  userId,
  receivePush = "Yes",
  allowRandomCall = "Yes",
  allowBlindDate = "Yes",
  hibernateAccount = "No",
  goIncognito = "No",
) {
  try {
    await connection.query(
      "INSERT INTO user_settings (id, user_id, receive_push, allow_random_call, allow_blind_date, hibernate_account, go_incognito) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        id,
        userId,
        receivePush,
        allowRandomCall,
        allowBlindDate,
        hibernateAccount,
        goIncognito,
      ],
      (error, result) => {
        if (error) {
          return { error: error };
        } else {
          return id;
        }
      },
    );
    //return id;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getUserSettingsById(settingsId) {
  try {
    const result = await connection.query(
      "SELECT * FROM user_settings WHERE id = ?",
      [settingsId],
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

export async function getUserSettingsByUserId(userId) {
  try {
    const result = await connection.query(
      "SELECT * FROM user_settings WHERE user_id = ?",
      [userId],
      (error, result) => {
        if (error) {
          return { error: error };
        } else {
          return result;
        }
      },
    );
    //return result[0];
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateUserSettingsById(
  settingsId,
  newUserId,
  newReceivePush,
  newAllowRandomCall,
  newAllowBlindDate,
  newHibernateAccount,
  newGoIncognito,
) {
  try {
    await connection.query(
      "UPDATE user_settings SET user_id = ?, receive_push = ?, allow_random_call = ?, allow_blind_date = ?, hibernate_account = ?, go_incognito = ? WHERE id = ?",
      [
        newUserId,
        newReceivePush,
        newAllowRandomCall,
        newAllowBlindDate,
        newHibernateAccount,
        newGoIncognito,
        settingsId,
      ],
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

export async function deleteUserSettingsById(settingsId) {
  try {
    await connection.query(
      "DELETE FROM user_settings WHERE id = ?",
      [settingsId],
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
