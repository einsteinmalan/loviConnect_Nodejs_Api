const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const UserSetting = sequelize.define(
  "UserSetting",
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
    receive_push: {
      type: DataTypes.ENUM("Yes", "No"),
      defaultValue: "Yes",
    },
    activate_astrology: {
      type: DataTypes.ENUM("Yes", "No"),
      defaultValue: "Yes",
    },
    allow_random_call: {
      type: DataTypes.ENUM("Yes", "No"),
      defaultValue: "Yes",
    },
    allow_blind_date: {
      type: DataTypes.ENUM("Yes", "No"),
      defaultValue: "Yes",
    },
    hibernate_account: {
      type: DataTypes.ENUM("Yes", "No"),
      defaultValue: "No",
    },
    go_incognito: {
      type: DataTypes.ENUM("Yes", "No"),
      defaultValue: "No",
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "user_settings",
  },
);

module.exports = UserSetting;
