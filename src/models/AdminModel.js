const connection = require("../config/database");
let form_validator = require("../form_validator");
const uuid = require("uuid");

export async function createAdmin(userId, type = "admin") {
  const id = uuid.v4();
  try {
    const result = await connection.query(
      "INSERT INTO admins (id, user_id, type) VALUES (?, ?, ?)",
      [id, userId, type],
    );
    return result.insertId;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAdminById(adminId) {
  try {
    const result = await connection.query("SELECT * FROM admins WHERE id = ?", [
      adminId,
    ]);
    return result[0];
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAllAdminsByUserId(userId) {
  try {
    const result = await connection.query(
      "SELECT * FROM admins WHERE user_id = ?",
      [userId],
    );
    return result;
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateAdminById(adminId, newUserId, newType) {
  try {
    await connection.query(
      "UPDATE admins SET user_id = ?, type = ? WHERE id = ?",
      [newUserId, newType, adminId],
    );
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteAdminById(adminId) {
  try {
    await connection.query("DELETE FROM admins WHERE id = ?", [adminId]);
  } catch (error) {
    throw new Error(error);
  }
}
