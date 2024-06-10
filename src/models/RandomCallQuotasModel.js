const connection = require("../config/database");
const uuid = require("uuid");
const id = uuid.v4();

export async function createRandomCallQuota(userId, quotaLeft = 0) {
  try {
    await connection.query(
      "INSERT INTO random_call_quotas (id, user_id, quota_left) VALUES (?, ?, ?)",
      [id, userId, quotaLeft],
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

export async function getRandomCallQuotaById(quotaId) {
  try {
    const result = await connection.query(
      "SELECT * FROM random_call_quotas WHERE id = ?",
      [quotaId],
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

export async function getRandomCallQuotaByUserId(userId) {
  try {
    const result = await connection.query(
      "SELECT * FROM random_call_quotas WHERE user_id = ?",
      [userId],
      (error, result) => {
        if (error) {
          return { error: error };
        } else {
          return result;
        }
      },
    );
    //return result[0];
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateRandomCallQuotaById(
  quotaId,
  newUserId,
  newQuotaLeft,
) {
  try {
    await connection.query(
      "UPDATE random_call_quotas SET user_id = ?, quota_left = ? WHERE id = ?",
      [newUserId, newQuotaLeft, quotaId],
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

export async function deleteRandomCallQuotaById(quotaId) {
  try {
    await connection.query(
      "DELETE FROM random_call_quotas WHERE id = ?",
      [quotaId],
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
