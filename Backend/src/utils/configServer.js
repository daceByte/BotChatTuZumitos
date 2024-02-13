const dotenv = require("dotenv");

dotenv.config();

const config = {
  env: process.env.ENVIRONMENT,
  port: process.env.PORT,
  token: process.env.TOKEN_KEY,
  expiration: process.env.TOKEN_EXPIRATION_TIME,
  salt: process.env.KEY_SALT,
  db: {
    driver: process.env.DB_DRIVER,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
};

module.exports = config;
