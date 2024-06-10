const connection = require("../config/database");
const uuid = require("uuid");
const id = uuid.v4();

export async function createUserPersonalityTest(
  userId,
  content,
  version = "1.0.0",
) {
  try {
    await connection.query(
      "INSERT INTO user_personality_test (id,user_id, content, version) VALUES (?, ?, ?, ?)",
      [id, userId, JSON.stringify(content), version],
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

export async function getUserPersonalityTestById(testId) {
  try {
    const result = await connection.query(
      "SELECT * FROM user_personality_test WHERE id = ?",
      [testId],
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

export async function getAllUserPersonalityTestsByUserId(userId) {
  try {
    const result = await connection.query(
      "SELECT * FROM user_personality_test WHERE user_id = ?",
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

export async function updateUserPersonalityTestById(
  testId,
  newUserId,
  newContent,
  newVersion,
) {
  try {
    await connection.query(
      "UPDATE user_personality_test SET user_id = ?, content = ?, version = ? WHERE id = ?",
      [newUserId, JSON.stringify(newContent), newVersion, testId],
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

export async function deleteUserPersonalityTestById(testId) {
  try {
    await connection.query(
      "DELETE FROM user_personality_test WHERE id = ?",
      [testId],
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
