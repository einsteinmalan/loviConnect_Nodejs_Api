const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Fake = sequelize.define("Fake", {
  id_fake: {
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
  create_time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Fake;
