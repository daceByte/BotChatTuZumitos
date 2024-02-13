const Sequelize = require("sequelize");
const db = require("../../utils/database.js");

const MResponse = db.define(
  "tbl_response",
  {
    res_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    res_message: {
      type: Sequelize.STRING,
    },
  },
  {
    tableName: "tbl_response",
  }
);

module.exports = MResponse;
