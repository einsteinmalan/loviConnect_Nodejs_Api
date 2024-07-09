const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Message = sequelize.define("Message", {
  id_message: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
  },
  id_chatroom: {
    type: DataTypes.CHAR(36),
    allowNull: false,
  },
  id_sender: {
    type: DataTypes.CHAR(36),
    allowNull: false,
  },
  id_user: {
    type: DataTypes.CHAR(36),
    allowNull: false,
  },
  time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  message: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },
  readed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Message;
