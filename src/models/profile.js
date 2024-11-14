const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Profile = sequelize.define(
  "Profile",
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("male", "female", "transgender"),
      defaultValue: "male",
    },
    sexuality: {
      type: DataTypes.ENUM("heterosexual", "homosexual", "bisexual"),
      defaultValue: "heterosexual",
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    biography: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    my_contribution: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    my_expectation: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    location_lat: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    location_lon: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    zodiac_sign: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    job: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    relationship_status: {
      type: DataTypes.ENUM(
        "single",
        "engaged",
        "in-relationship",
        "married",
        "divorcee",
        "complicated",
      ),
      defaultValue: "single",
      allowNull: false,
    },
    looking_for: {
      type: DataTypes.ENUM("friendship", "relationship", "fun"),
      defaultValue: "friendship",
      allowNull: false,
    },
    religion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fame: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country_code: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "profiles",
  },
);

module.exports = Profile;
