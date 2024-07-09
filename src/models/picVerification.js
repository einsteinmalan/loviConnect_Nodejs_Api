const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const PicVerification = sequelize.define("PicVerification", {
  id_pic: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
  },
  id_user: {
    type: DataTypes.CHAR(36),
    allowNull: false,
  },
  path: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
});

module.exports = PicVerification;
