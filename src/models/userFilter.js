const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const UserFilter = sequelize.define(
  "UserFilter",
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("male", "female", "both"),
      defaultValue: "male",
    },
    sexuality: {
      type: DataTypes.ENUM("heterosexual", "homosexual", "bisexual"),
      allowNull: true,
    },
    age_start: {
      type: DataTypes.INTEGER,
      defaultValue: 18,
      allowNull: false,
    },
    age_limit: {
      type: DataTypes.INTEGER,
      defaultValue: 60,
      allowNull: false,
    },
    interest: {
      type: DataTypes.ENUM("relationship", "friendship", "fun", "any"),
      defaultValue: "any",
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "user_filters",
  },
);

module.exports = UserFilter;
