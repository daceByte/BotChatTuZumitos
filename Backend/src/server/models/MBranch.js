const Sequelize = require("sequelize");
const db = require("../../utils/database.js");

const MBranch = db.define(
  "tbl_branch",
  {
    bra_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bra_name: {
      type: Sequelize.STRING,
    },
  },
  {
    tableName: "tbl_branch",
  }
);

module.exports = MBranch;
