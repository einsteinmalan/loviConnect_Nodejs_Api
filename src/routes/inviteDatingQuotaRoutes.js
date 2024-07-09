const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Booster = sequelize.define(
  "Booster",
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("boost", "super_boost"),
      defaultValue: "boost",
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "booster",
  },
);

module.exports = Booster;
