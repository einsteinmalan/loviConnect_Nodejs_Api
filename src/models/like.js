const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Like = sequelize.define("Like", {
  id_likes: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
  },
  id_user: {
    type: DataTypes.UUIDV4,
    allowNull: false,
  },
  id_sender: {
    type: DataTypes.UUIDV4,
    allowNull: false,
  },
  like_time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Like;
