import * as AdminSettingsModel from '../models/AdminSettingsModel';

export async function createAdminSettings(req, res) {
    const { appVersion, maintenanceActive } = req.body;

    try {
        const adminSettingsId = await AdminSettingsModel.createAdminSettings(appVersion, maintenanceActive);
        res.status(201).json({
            status: 201,
            message: 'Admin Settings created successfully',
            data: { id: adminSettingsId }
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error creating Admin Settings',
            error: error.message,
            data: null
        });
    }
}

export async function getAdminSettings(req, res) {
    const { adminSettingsId } = req.params;

    try {
        const adminSettings = await AdminSettingsModel.getAdminSettingsById(adminSettingsId);
        res.status(200).json({
            status: 200,
            message: 'Admin Settings retrieved successfully',
            data: adminSettings
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error retrieving Admin Settings',
            error: error.message,
            data: null
        });
    }
}

export async function updateAdminSettings(req, res) {
    const { adminSettingsId } = req.params;
    const { newAppVersion, newMaintenanceActive } = req.body;

    try {
        await AdminSettingsModel.updateAdminSettingsById(adminSettingsId, newAppVersion, newMaintenanceActive);
        res.status(200).json({
            status: 200,
            message: 'Admin Settings updated successfully',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error updating Admin Settings',
            error: error.message,
            data: null
        });
    }
}
