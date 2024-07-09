const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Support = sequelize.define(
  "Support",
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
    ticket_type_id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
    complaints: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "in-progress", "resolved", "cancelled"),
      defaultValue: "pending",
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "supports",
  },
);

module.exports = Support;
