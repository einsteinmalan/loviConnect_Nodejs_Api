import * as AdminModel from "../models/AdminModel";

export async function createAdmin(req, res) {
  const { userId, type } = req.body;

  try {
    const adminId = await AdminModel.createAdmin(userId, type);
    res.status(201).json({
      status: 201,
      message: "Admin created successfully",
      data: { id: adminId },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error,
      error: error.message,
      data: null,
    });
  }
}

export async function getAdmin(req, res) {
  const { adminId } = req.params;

  try {
    const admin = await AdminModel.getAdminById(adminId);
    res.status(200).json({
      status: 200,
      message: "Admin retrieved successfully",
      data: admin,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error,
      error: error.message,
      data: null,
    });
  }
}

export async function getAllAdminsByUser(req, res) {
  const { userId } = req.params;

  try {
    const admins = await AdminModel.getAllAdminsByUserId(userId);
    res.status(200).json({
      status: 200,
      message: "Admins retrieved successfully",
      data: admins,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error,
      error: error.message,
      data: null,
    });
  }
}

export async function updateAdmin(req, res) {
  const { adminId } = req.params;
  const { newUserId, newType } = req.body;

  try {
    await AdminModel.updateAdminById(adminId, newUserId, newType);
    res
      .status(200)
      .json({ status: 200, message: "Admin updated successfully", data: null });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error updating Admin",
      error: error.message,
      data: null,
    });
  }
}

export async function deleteAdmin(req, res) {
  const { adminId } = req.params;

  try {
    await AdminModel.deleteAdminById(adminId);
    res
      .status(200)
      .json({ status: 200, message: "Admin deleted successfully", data: null });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error,
      error: error.message,
      data: null,
    });
  }
}
