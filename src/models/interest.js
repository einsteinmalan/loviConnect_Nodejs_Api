const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Interest = sequelize.define("Interest", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  interest: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
});

module.exports = Interest;
