const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Admin = sequelize.define("Admin", {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUIDV4,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM("super_admin", "admin", "moderator", "accountant"),
    allowNull: false,
    defaultValue: "admin",
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Admin;
