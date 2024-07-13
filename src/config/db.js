const { Sequelize } = require("sequelize");
import { PostgresDialect } from "@sequelize/postgres";
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT, // Ensure you have DB_PORT defined in your .env file
    logging: false, // Optional: Disable logging for cleaner console output
  },
);

module.exports = sequelize;
