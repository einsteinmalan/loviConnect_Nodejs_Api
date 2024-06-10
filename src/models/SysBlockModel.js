const connection = require("../config/database");
const uuid = require("uuid");
const id = uuid.v4();

export async function createSysBlock(userId, reason) {
  try {
    await connection.query(
      "INSERT INTO sys_blocks (id, id_user, reason) VALUES (?, ?, ?)",
      [id, userId, reason],
    );
    return id;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getSysBlockById(sysBlockId) {
  try {
    const result = await connection.query(
      "SELECT * FROM sys_blocks WHERE id = ?",
      [sysBlockId],
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

export async function getAllSysBlocksByUserId(userId) {
  try {
    const result = await connection.query(
      "SELECT * FROM sys_blocks WHERE id_user = ?",
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

export async function updateSysBlockById(sysBlockId, newUserId, newReason) {
  try {
    await connection.query(
      "UPDATE sys_blocks SET id_user = ?, reason = ? WHERE id = ?",
      [newUserId, newReason, sysBlockId],
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

export async function deleteSysBlockById(sysBlockId) {
  try {
    await connection.query(
      "DELETE FROM sys_blocks WHERE id = ?",
      [sysBlockId],
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
