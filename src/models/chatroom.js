const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Chatroom = sequelize.define("Chatroom", {
  id_chatroom: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
  },
  id_user_1: {
    type: DataTypes.CHAR(36),
    allowNull: false,
  },
  id_user_2: {
    type: DataTypes.CHAR(36),
    allowNull: false,
  },
});

module.exports = Chatroom;
