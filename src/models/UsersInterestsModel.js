const connection = require("../config/database");
const uuid = require("uuid");
const id = uuid.v4();

export async function createUserInterest(userId, interestId) {
  try {
    await connection.query(
      "INSERT INTO users_interests (id, id_user, id_interest) VALUES (?, ?, ?)",
      [id, userId, interestId],
      (error, result) => {
        if (error) {
          return { error: error };
        } else {
          return id;
        }
      },
    );
    // return id;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getUserInterestById(userInterestId) {
  try {
    const result = await connection.query(
      "SELECT * FROM users_interests WHERE id = ?",
      [userInterestId],
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

export async function getAllUserInterestsByUserId(userId) {
  try {
    const result = await connection.query(
      "SELECT * FROM users_interests WHERE id_user = ?",
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

export async function updateUserInterestById(
  userInterestId,
  newUserId,
  newInterestId,
) {
  try {
    await connection.query(
      "UPDATE users_interests SET id_user = ?, id_interest = ? WHERE id = ?",
      [newUserId, newInterestId, userInterestId],
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

export async function deleteUserInterestById(userInterestId) {
  try {
    await connection.query(
      "DELETE FROM users_interests WHERE id = ?",
      [userInterestId],
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
