const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const FakeProfile = sequelize.define("FakeProfile", {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
  },
  id_user: {
    type: DataTypes.UUIDV4,
    allowNull: false,
  },
  create_time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = FakeProfile;
