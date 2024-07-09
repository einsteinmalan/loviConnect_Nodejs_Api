const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Notification = sequelize.define("Notification", {
  id_notif: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
  },
  id_user: {
    type: DataTypes.CHAR(36),
    allowNull: true,
  },
  id_sender: {
    type: DataTypes.CHAR(36),
    allowNull: false,
  },
  notification: {
    type: DataTypes.STRING(25),
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM("Personal", "System"),
    allowNull: false,
    defaultValue: "Personal",
  },
  notif_time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Notification;
