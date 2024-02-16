import express from 'express';
import * as UserSettingsController from '../controllers/UserSettingsController';

const router = express.Router();

// Create User Settings
router.post('/user-settings', UserSettingsController.createUserSettings);

// Get User Settings by ID
router.get('/user-settings/:settingsId', UserSettingsController.getUserSettings);

// Get User Settings by User
router.get('/user-settings/user/:userId', UserSettingsController.getUserSettingsByUser);

// Update User Settings
router.put('/user-settings/:settingsId', UserSettingsController.updateUserSettings);

// Delete User Settings
router.delete('/user-settings/:settingsId', UserSettingsController.deleteUserSettings);

export default router;
