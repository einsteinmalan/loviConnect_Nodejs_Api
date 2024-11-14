const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Reply = sequelize.define(
  "Reply",
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
    support_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
    reply: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "replies",
  },
);

module.exports = Reply;
