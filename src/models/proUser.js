const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ProUser = sequelize.define(
  "ProUser",
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
    duration: {
      type: DataTypes.ENUM("month", "semester", "year"),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "pro_users",
  },
);

module.exports = ProUser;
