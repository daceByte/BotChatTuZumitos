const Sequelize = require("sequelize");
const db = require("../../utils/database.js");
const MBranch = require("./MBranch.js");

const MDelivery = db.define(
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
    del_status: {
      type: Sequelize.TINYINT,
    },
    fk_del_bra_id: {
      type: Sequelize.INTEGER,
    },
  },
  {
    tableName: "tbl_delivery",
  }
);

MDelivery.belongsTo(MBranch, { foreignKey: "fk_del_bra_id" });

module.exports = MDelivery;
