const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Fake = sequelize.define("Fake", {
  id_fake: {
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
  create_time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Fake;
