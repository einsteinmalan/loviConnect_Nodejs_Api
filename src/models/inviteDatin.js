const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const InviteDating = sequelize.define(
  "InviteDating",
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
    invited_id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "invite_datings",
  },
);

module.exports = InviteDating;
