const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const VersusWin = sequelize.define(
  "VersusWin",
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },
    win_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
    chooser_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
    lost_id: {
      type: DataTypes.UUIDV4,
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
    tableName: "versus_wins",
  },
);

module.exports = VersusWin;
