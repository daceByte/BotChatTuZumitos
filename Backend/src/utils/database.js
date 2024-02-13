const Sequelize = require("sequelize");
const config = require("../utils/configServer");
const logger = require("../middleware/logger");
const {sv} = require("../utils/constans");
const ctx = { ctx: sv.ctx + " [DATABASE]" };
let database;

try {
  database = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: config.db.driver,
    port: config.db.port,
    logging: true,
    define: {
      timestamps: false,
    },
  });

  logger.child(ctx).info("Database connected");
} catch (error) {
  logger.error(" Database not connected " + error);
}

database.sync();

module.exports = database;
