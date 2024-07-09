const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const UserInterest = sequelize.define(
  "UserInterest",
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
    id_interest: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "users_interests",
  },
);

module.exports = UserInterest;
