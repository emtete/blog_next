const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  development: {
    username: "next_blog",
    password: process.env.DB_PASSWORD,
    database: "next_blog",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "next_blog",
    password: process.env.DB_PASSWORD,
    database: "next_blog",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "next_blog",
    password: process.env.DB_PASSWORD,
    database: "next_blog",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
