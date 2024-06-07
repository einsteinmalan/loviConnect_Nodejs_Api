const connection = require("../config/database");
const uuid = require("uuid");
const id = uuid.v4();

export async function createSupport(
  userId,
  ticketTypeId,
  complaints,
  reply = null,
  status = "pending",
) {
  try {
    await connection.query(
      "INSERT INTO supports (id, user_id, ticket_type_id, complaints, reply, status) VALUES (?, ?, ?, ?, ?, ?)",
      [id, userId, ticketTypeId, complaints, reply, status],
    );
    return id;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getSupportById(supportId) {
  try {
    const result = await connection.query(
      "SELECT * FROM supports WHERE id = ?",
      [supportId],
    );
    return result[0];
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAllSupportsByUserId(userId) {
  try {
    const result = await connection.query(
      "SELECT * FROM supports WHERE user_id = ?",
      [userId],
    );
    return result;
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateSupportById(
  supportId,
  newUserId,
  newTicketTypeId,
  newComplaints,
  newReply,
  newStatus,
) {
  try {
    await connection.query(
      "UPDATE supports SET user_id = ?, ticket_type_id = ?, complaints = ?, reply = ?, status = ? WHERE id = ?",
      [
        newUserId,
        newTicketTypeId,
        newComplaints,
        newReply,
        newStatus,
        supportId,
      ],
    );
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteSupportById(supportId) {
  try {
    await connection.query("DELETE FROM supports WHERE id = ?", [supportId]);
  } catch (error) {
    throw new Error(error);
  }
}
