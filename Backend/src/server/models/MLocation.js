const Sequelize = require("sequelize");
const db = require("../../utils/database.js");

const MLocation = db.define(
  "tbl_location",
  {
    loc_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    loc_address: {
      type: Sequelize.STRING,
    },
    loc_zone: {
      type: Sequelize.STRING,
    },
    loc_link: {
      type: Sequelize.STRING,
    },
    loc_default: {
      type: Sequelize.TINYINT,
    },
    fk_loc_cli_id: {
      type: Sequelize.INTEGER,
    },
  },
  {
    tableName: "tbl_location",
  }
);

module.exports = MLocation;
