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
      (error, result) => {
        if (error) {
          return { error: error };
        } else {
          return id;
        }
      },
    );
    //return id;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getSupportById(supportId) {
  try {
    const result = await connection.query(
      "SELECT * FROM supports WHERE id = ?",
      [supportId],
      (error, result) => {
        if (error) {
          return { error: error };
        } else {
          return result[0];
        }
      },
    );
    //return result[0];
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAllSupportsByUserId(userId) {
  try {
    const result = await connection.query(
      "SELECT * FROM supports WHERE user_id = ?",
      [userId],
      (error, result) => {
        if (error) {
          return { error: error };
        } else {
          return result;
        }
      },
    );
    //return result;
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
      (error, result) => {
        if (error) {
          return { error: error };
        } else {
          return result;
        }
      },
    );
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteSupportById(supportId) {
  try {
    await connection.query(
      "DELETE FROM supports WHERE id = ?",
      [supportId],
      (error, result) => {
        if (error) {
          return { error: error };
        } else {
          return result;
        }
      },
    );
  } catch (error) {
    throw new Error(error);
  }
}
