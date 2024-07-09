const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const PersonalityTestQuestion = sequelize.define(
  "PersonalityTestQuestion",
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dataType: {
      type: DataTypes.STRING,
      field: "data-type",
      allowNull: false,
    },
    choices: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    version: {
      type: DataTypes.STRING,
      defaultValue: "1.0.0",
    },
    gender: {
      type: DataTypes.ENUM("Male", "Female"),
      defaultValue: "Male",
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "personality_test_questions",
  },
);

module.exports = PersonalityTestQuestion;
