const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Like = sequelize.define("Like", {
  id_likes: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
  },
  id_user: {
    type: DataTypes.CHAR(36),
    allowNull: false,
  },
  id_sender: {
    type: DataTypes.CHAR(36),
    allowNull: false,
  },
  like_time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Like;
