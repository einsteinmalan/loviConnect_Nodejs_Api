const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const RandomCallQuota = sequelize.define(
  "RandomCallQuota",
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
    quota_left: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "random_call_quotas",
  },
);

module.exports = RandomCallQuota;
