import * as UserSettingsModel from "../models/userSetting";

export async function createUserSettings(req, res) {
  const {
    userId,
    receivePush,
    allowRandomCall,
    allowBlindDate,
    hibernateAccount,
    goIncognito,
  } = req.body;

  try {
    const settingsId = await UserSettingsModel.createUserSettings(
      userId,
      receivePush,
      allowRandomCall,
      allowBlindDate,
      hibernateAccount,
      goIncognito,
    );
    res.status(201).json({
      status: 201,
      message: "User Settings created successfully",
      data: { id: settingsId },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error creating User Settings",
      error: error.message,
      data: null,
    });
  }
}

export async function getUserSettings(req, res) {
  const { settingsId } = req.params;

  try {
    const settings = await UserSettingsModel.getUserSettingsById(settingsId);
    res.status(200).json({
      status: 200,
      message: "User Settings retrieved successfully",
      data: settings,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error retrieving User Settings",
      error: error.message,
      data: null,
    });
  }
}

export async function getUserSettingsByUser(req, res) {
  const { userId } = req.params;

  try {
    const settings = await UserSettingsModel.getUserSettingsByUserId(userId);
    res.status(200).json({
      status: 200,
      message: "User Settings retrieved successfully",
      data: settings,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error retrieving User Settings",
      error: error.message,
      data: null,
    });
  }
}

export async function updateUserSettingsById(req, res) {
  const { settingsId } = req.params;
  const {
    newUserId,
    newReceivePush,
    newAllowRandomCall,
    newAllowBlindDate,
    newHibernateAccount,
    newGoIncognito,
  } = req.body;

  try {
    await UserSettingsModel.updateUserSettingsById(
      settingsId,
      newUserId,
      newReceivePush,
      newAllowRandomCall,
      newAllowBlindDate,
      newHibernateAccount,
      newGoIncognito,
    );
    res.status(200).json({
      status: 200,
      message: "User Settings updated successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error updating User Settings",
      error: error.message,
      data: null,
    });
  }
}

export async function deleteUserSettings(req, res) {
  const { settingsId } = req.params;

  try {
    await UserSettingsModel.deleteUserSettingsById(settingsId);
    res.status(200).json({
      status: 200,
      message: "User Settings deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error deleting User Settings",
      error: error.message,
      data: null,
    });
  }
}
