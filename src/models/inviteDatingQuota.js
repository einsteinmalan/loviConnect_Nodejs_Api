const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const InviteDatingQuota = sequelize.define(
  "InviteDatingQuota",
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.CHAR(36),
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
    tableName: "invite_datings_quotas",
  },
);

module.exports = InviteDatingQuota;
