const Sequelize = require("sequelize");
const db = require("../../utils/database.js");

const MResponse = db.define(
  "tbl_delivery",
  {
    del_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    del_fullname: {
      type: Sequelize.STRING,
    },
    del_phone: {
      type: Sequelize.STRING,
    },
    fk_del_bra_id: {
      type: Sequelize.INTEGER,
    },
  },
  {
    tableName: "tbl_delivery",
  }
);

module.exports = MResponse;
