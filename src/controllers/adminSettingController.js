const { v4: uuidv4 } = require("uuid");
const AdminSetting = require("../models/adminSetting");

exports.createAdminSetting = async (req, res) => {
  const { app_version, maintenance_active } = req.body;

  try {
    const newAdminSetting = await AdminSetting.create({
      id: uuidv4(),
      app_version,
      maintenance_active,
    });

    res.status(201).json(newAdminSetting);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getAdminSettings = async (req, res) => {
  try {
    const adminSettings = await AdminSetting.findAll();
    res.status(200).json(adminSettings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getAdminSettingById = async (req, res) => {
  const { id } = req.params;

  try {
    const adminSetting = await AdminSetting.findByPk(id);

    if (!adminSetting) {
      return res.status(404).json({ message: "Admin setting not found" });
    }

    res.status(200).json(adminSetting);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateAdminSetting = async (req, res) => {
  const { id } = req.params;
  const { app_version, maintenance_active } = req.body;

  try {
    const adminSetting = await AdminSetting.findByPk(id);

    if (!adminSetting) {
      return res.status(404).json({ message: "Admin setting not found" });
    }

    if (app_version !== undefined) adminSetting.app_version = app_version;
    if (maintenance_active !== undefined)
      adminSetting.maintenance_active = maintenance_active;

    await adminSetting.save();
    res.status(200).json(adminSetting);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deleteAdminSetting = async (req, res) => {
  const { id } = req.params;

  try {
    const adminSetting = await AdminSetting.findByPk(id);

    if (!adminSetting) {
      return res.status(404).json({ message: "Admin setting not found" });
    }

    await adminSetting.destroy();
    res.status(200).json({ message: "Admin setting deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
