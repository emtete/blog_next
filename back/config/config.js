const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  development: {
    username: "next_blog",
    password: process.env.DB_PASSWORD,
    database: "next_blog",
    host: "127.0.0.1",
    // host: "heroku pg:psql postgresql-shallow-48649 --app dev-life-kr",
    dialect: "mysql",
    // dialect: "postgres",
  },
  test: {
    username: "next_blog",
    password: process.env.DB_PASSWORD,
    database: "next_blog",
    host: "127.0.0.1",
    dialect: "mysql",
    // dialect: "postgres",
  },
  production: {
    username: "next_blog",
    password: process.env.DB_PASSWORD,
    database: "next_blog",
    host: "127.0.0.1",
    dialect: "mysql",
    // dialect: "postgres",
  },
};
