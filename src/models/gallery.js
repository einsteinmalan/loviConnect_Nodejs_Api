const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Gallery = sequelize.define("Gallery", {
  id: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
  },
  id_user: {
    type: DataTypes.CHAR(36),
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM("image", "video"),
    defaultValue: "image",
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Gallery;
