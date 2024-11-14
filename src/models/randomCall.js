const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const RandomCall = sequelize.define(
  "RandomCall",
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
    called_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("completed", "rejected", "cancelled", "failed"),
      defaultValue: "failed",
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "random_calls",
  },
);

module.exports = RandomCall;
