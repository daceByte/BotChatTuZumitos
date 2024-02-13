const Sequelize = require("sequelize");
const db = require("../../utils/database.js");

const MLead = db.define(
  "tbl_lead",
  {
    lea_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lea_phone: {
      type: Sequelize.STRING,
    },
    lea_nickname: {
      type: Sequelize.STRING,
    },
    lea_type: {
      type: Sequelize.INTEGER,
    },
  },
  {
    tableName: "tbl_lead",
  }
);

module.exports = MLead;
