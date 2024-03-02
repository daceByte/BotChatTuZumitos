const Sequelize = require("sequelize");
const db = require("../../utils/database.js");
const MBranch = require("./MBranch.js");

const MClient = db.define(
  "tbl_client",
  {
    cli_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cli_fullname: {
      type: Sequelize.STRING,
    },
    cli_phone: {
      type: Sequelize.STRING,
    },
    cli_method: {
      type: Sequelize.TINYINT,
    },
    cli_payment: {
      type: Sequelize.TINYINT,
    },
    cli_note: {
      type: Sequelize.TEXT,
    },
    fk_cli_bra_id: {
      type: Sequelize.INTEGER,
    },
  },
  {
    tableName: "tbl_client",
  }
);

MClient.belongsTo(MBranch, { foreignKey: "fk_cli_bra_id" });

db.sync()
  .then(() => {
    console.log("Base de datos y tablas creadas si no existen.");
  })
  .catch((error) => {
    console.error("Error al sincronizar las tablas:", error);
  });

module.exports = MClient;
