const connection = require("../config/database");
const uuid = require("uuid");
const id = uuid.v4();

export async function createInviteDating(
  userId,
  invitedId,
  isActive = 0,
  isCompleted = 0,
) {
  try {
    await connection.query(
      "INSERT INTO invite_datings (id,user_id, invited_id, is_active, is_completed) VALUES (?, ?, ?, ?, ?)",
      [id, userId, invitedId, isActive, isCompleted],
    );
    return id;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getInviteDatingById(inviteId) {
  try {
    const result = await connection.query(
      "SELECT * FROM invite_datings WHERE id = ?",
      [inviteId],
    );
    return result[0];
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAllInviteDatingsByUserId(userId) {
  try {
    const result = await connection.query(
      "SELECT * FROM invite_datings WHERE user_id = ?",
      [userId],
    );
    return result;
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateInviteDatingById(
  inviteId,
  newUserId,
  newInvitedId,
  newIsActive,
  newIsCompleted,
) {
  try {
    await connection.query(
      "UPDATE invite_datings SET user_id = ?, invited_id = ?, is_active = ?, is_completed = ? WHERE id = ?",
      [newUserId, newInvitedId, newIsActive, newIsCompleted, inviteId],
    );
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteInviteDatingById(inviteId) {
  try {
    await connection.query("DELETE FROM invite_datings WHERE id = ?", [
      inviteId,
    ]);
  } catch (error) {
    throw new Error(error);
  }
}
