const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Pic = sequelize.define("Pic", {
  id_pic: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
  },
  id_user: {
    type: DataTypes.CHAR(36),
    allowNull: false,
  },
  pic_number: {
    type: DataTypes.TINYINT,
    allowNull: true,
  },
  type: {
    type: DataTypes.ENUM("profile", "casual", "dinner", "work"),
    allowNull: false,
  },
  path: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
});

module.exports = Pic;
