const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const SysBlock = sequelize.define("SysBlock", {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
  },
  id_user: {
    type: DataTypes.UUIDV4,
    allowNull: false,
  },
  reason: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = SysBlock;
