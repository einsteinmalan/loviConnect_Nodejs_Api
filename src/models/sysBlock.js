const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const SysBlock = sequelize.define("SysBlock", {
  id: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
  },
  id_user: {
    type: DataTypes.CHAR(36),
    allowNull: false,
  },
  reason: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = SysBlock;
