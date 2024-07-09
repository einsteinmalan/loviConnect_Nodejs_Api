// const connection = require("../config/database");
// const uuid = require("uuid");
// const id = uuid.v4();

// export async function createBlock(userId, senderId) {
//   try {
//     const result = await connection.query(
//       "INSERT INTO blocks (id, id_user, id_sender) VALUES (?, ?, ?)",
//       [id, userId, senderId],
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return id;
//         }
//       },
//     );
//     //return result.insertId;
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function getBlockById(blockId) {
//   try {
//     await connection.query(
//       "SELECT * FROM blocks WHERE id_block = ?",
//       [blockId],
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result[0];
//         }
//       },
//     );
//     //return result[0];
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function getAllBlocksByUserId(userId) {
//   try {
//     await connection.query(
//       "SELECT * FROM blocks WHERE id_user = ?",
//       [userId],
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//     //return result;
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function updateBlockById(blockId, newUserId, newSenderId) {
//   try {
//     await connection.query(
//       "UPDATE blocks SET id_user = ?, id_sender = ? WHERE id_block = ?",
//       [newUserId, newSenderId, blockId],
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// export async function deleteBlockById(blockId) {
//   try {
//     await connection.query(
//       "DELETE FROM blocks WHERE id_block = ?",
//       [blockId],
//       (error, result) => {
//         if (error) {
//           return { error: error };
//         } else {
//           return result;
//         }
//       },
//     );
//   } catch (err) {
//     throw new Error(err);
//   }
// }

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Block = sequelize.define("Block", {
  id_block: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
  },
  id_user: {
    type: DataTypes.CHAR(36),
    allowNull: false,
  },
  id_sender: {
    type: DataTypes.CHAR(36),
    allowNull: false,
  },
  block_time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Block;
