const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const AdminSetting = sequelize.define(
  "AdminSetting",
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
    },
    app_version: {
      type: DataTypes.STRING,
      defaultValue: "1.0.0",
      allowNull: false,
    },
    maintenance_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    tableName: "admin_settings",
  },
);

module.exports = AdminSetting;
