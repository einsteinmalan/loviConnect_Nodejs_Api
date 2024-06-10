const connection = require("../config/database");
const uuid = require("uuid");

export async function createFake(userId, senderId) {
  const id = uuid.v4();
  try {
    await connection.query(
      "INSERT INTO fakes (id_fake,id_user, id_sender) VALUES (?, ?, ?)",
      [id, userId, senderId],
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

export async function getFakeById(fakeId) {
  try {
    await connection.query(
      "SELECT * FROM fakes WHERE id_fake = ?",
      [fakeId],
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

export async function getAllFakesByUserId(userId) {
  try {
    await connection.query(
      "SELECT * FROM fakes WHERE id_user = ?",
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

export async function updateFakeById(fakeId, newUserId, newSenderId) {
  try {
    await connection.query(
      "UPDATE fakes SET id_user = ?, id_sender = ? WHERE id_fake = ?",
      [newUserId, newSenderId, fakeId],
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

export async function deleteFakeById(fakeId) {
  try {
    await connection.query(
      "DELETE FROM fakes WHERE id_fake = ?",
      [fakeId],
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
