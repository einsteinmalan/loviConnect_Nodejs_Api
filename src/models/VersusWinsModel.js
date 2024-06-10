const connection = require("../config/database");
const uuid = require("uuid");
const id = uuid.v4();

export async function createVersusWin(userId, chooserId, lostIds = []) {
  try {
    await connection.query(
      "INSERT INTO versus_wins (id, user_id, chooser_id, lost_id) VALUES (?, ?, ?, ?)",
      [id, userId, chooserId, JSON.stringify(lostIds)],
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

export async function getVersusWinById(versusWinId) {
  try {
    const result = await connection.query(
      "SELECT * FROM versus_wins WHERE id = ?",
      [versusWinId],
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

export async function getVersusWinsByUserId(userId) {
  try {
    const result = await connection.query(
      "SELECT * FROM versus_wins WHERE user_id = ?",
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

export async function updateVersusWinById(
  versusWinId,
  newUserId,
  newChooserId,
  newLostIds,
) {
  try {
    await connection.query(
      "UPDATE versus_wins SET user_id = ?, chooser_id = ?, lost_id = ? WHERE id = ?",
      [newUserId, newChooserId, JSON.stringify(newLostIds), versusWinId],
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

export async function deleteVersusWinById(versusWinId) {
  try {
    await connection.query(
      "DELETE FROM versus_wins WHERE id = ?",
      [versusWinId],
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
