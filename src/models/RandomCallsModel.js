const connection = require("../config/database");
const uuid = require("uuid");
const id = uuid.v4();

export async function createRandomCall(userId, calledId, status = "failed") {
  try {
    await connection.query(
      "INSERT INTO random_calls (id, user_id, called_id, status) VALUES (?, ?, ?, ?)",
      [id, userId, calledId, status],
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

export async function getRandomCallById(callId) {
  try {
    const result = await connection.query(
      "SELECT * FROM random_calls WHERE id = ?",
      [callId],
      (error, result) => {
        if (error) {
          return { error: error };
        } else {
          return result[0];
        }
      },
    );
    // return result[0];
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAllRandomCallsByUserId(userId) {
  try {
    const result = await connection.query(
      "SELECT * FROM random_calls WHERE user_id = ?",
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

export async function updateRandomCallById(
  callId,
  newUserId,
  newCalledId,
  newStatus,
) {
  try {
    await connection.query(
      "UPDATE random_calls SET user_id = ?, called_id = ?, status = ? WHERE id = ?",
      [newUserId, newCalledId, newStatus, callId],
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

export async function deleteRandomCallById(callId) {
  try {
    await connection.query(
      "DELETE FROM random_calls WHERE id = ?",
      [callId],
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
