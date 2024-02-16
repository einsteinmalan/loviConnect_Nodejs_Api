import express from 'express';
import * as AdminSettingsController from '../controllers/AdminSettingsController';

const router = express.Router();

// Create Admin Settings
router.post('/admin-settings', AdminSettingsController.createAdminSettings);

// Get Admin Settings by ID
router.get('/admin-settings/:adminSettingsId', AdminSettingsController.getAdminSettings);

// Update Admin Settings
router.put('/admin-settings/:adminSettingsId', AdminSettingsController.updateAdminSettings);

export default router;
