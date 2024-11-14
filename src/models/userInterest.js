const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const UserInterest = sequelize.define(
  "UserInterest",
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
    id_interest: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "users_interests",
  },
);

module.exports = UserInterest;
