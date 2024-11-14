const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Pic = sequelize.define("Pic", {
  id_pic: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
  },
  id_user: {
    type: DataTypes.UUIDV4,
    allowNull: false,
  },
  pic_number: {
    // 1: profile 2: casual  3: dinner   4:work
    type: DataTypes.INTEGER,
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
