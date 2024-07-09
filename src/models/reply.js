const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Reply = sequelize.define(
  "Reply",
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
    support_id: {
      type: DataTypes.CHAR(36),
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
