const { v4: uuidv4 } = require("uuid");
const Admin = require("../models/admin");
const User = require("../models/user");

exports.createAdmin = async (req, res) => {
  const { user_id, type } = req.body;

  if (!user_id || !type) {
    return res.status(400).json({ message: "user_id and type are required" });
  }

  try {
    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newAdmin = await Admin.create({
      id: uuidv4(),
      user_id,
      type,
    });

    res.status(201).json(newAdmin);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.status(200).json(admins);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getAdminById = async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await Admin.findByPk(id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json(admin);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { user_id, type } = req.body;

  try {
    const admin = await Admin.findByPk(id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (!user_id || !type) {
      return res.status(400).json({ message: "user_id and type are required" });
    }

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user_id !== admin.user_id) admin.user_id = user_id;
    if (type !== admin.type) admin.type = type;

    await admin.save();
    res.status(200).json(admin);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deleteAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await Admin.findByPk(id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    await admin.destroy();
    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
