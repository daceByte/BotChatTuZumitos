const Sequelize = require("sequelize");
const db = require("../../utils/database.js");

const MAdmin = db.define(
  "tbl_admin",
  {
    adm_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    adm_user: {
      type: Sequelize.STRING,
    },
    adm_pass: {
      type: Sequelize.STRING,
    },
    adm_last_login: {
      type: Sequelize.DATE,
    },
    fk_adm_bra_id: {
      type: Sequelize.INTEGER,
    },
  },
  {
    tableName: "tbl_admin",
  }
);

db.sync()
  .then(() => {
    console.log("Base de datos y tablas creadas si no existen.");
  })
  .catch((error) => {
    console.error("Error al sincronizar las tablas:", error);
  });

module.exports = MAdmin;
