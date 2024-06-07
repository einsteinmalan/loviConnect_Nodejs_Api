const connection = require("../config/database");
const uuid = require("uuid");
const id = uuid.v4();

export async function createBooster(userId, type = "boost") {
  try {
    await connection.query(
      "INSERT INTO booster (id, user_id, type) VALUES (?, ?, ?)",
      [id, userId, type],
      (error, result) => {
        if (error) {
          return { error: error };
        } else {
          return id;
        }
      },
    );
    // return result.insertId;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getBoosterById(boosterId) {
  try {
    await connection.query(
      "SELECT * FROM booster WHERE id = ?",
      [boosterId],
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

export async function getBoostersByUserId(userId) {
  try {
    await connection.query(
      "SELECT * FROM booster WHERE user_id = ?",
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

export async function updateBoosterById(boosterId, newUserId, newType) {
  try {
    await connection.query(
      "UPDATE booster SET user_id = ?, type = ? WHERE id = ?",
      [newUserId, newType, boosterId],
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

export async function deleteBoosterById(boosterId) {
  try {
    await connection.query("DELETE FROM booster WHERE id = ?", [boosterId]);
  } catch (error) {
    throw new Error(error);
  }
}
