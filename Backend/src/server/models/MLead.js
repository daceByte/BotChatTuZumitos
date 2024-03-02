const Sequelize = require("sequelize");
const db = require("../../utils/database.js");
const MBranch = require("./MBranch.js");

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
    fk_lea_bra_id: {
      type: Sequelize.INTEGER,
    },
  },
  {
    tableName: "tbl_lead",
  }
);

MLead.belongsTo(MBranch, { foreignKey: "fk_lea_bra_id" });

db.sync()
  .then(() => {
    console.log("Base de datos y tablas creadas si no existen.");
  })
  .catch((error) => {
    console.error("Error al sincronizar las tablas:", error);
  });

module.exports = MLead;
