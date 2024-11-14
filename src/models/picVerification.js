const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const PicVerification = sequelize.define("PicVerification", {
  id_pic: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
  },
  id_user: {
    type: DataTypes.UUIDV4,
    allowNull: false,
  },
  path: {
    type: DataTypes.UUIDV4,
    allowNull: false,
  },
});

module.exports = PicVerification;
