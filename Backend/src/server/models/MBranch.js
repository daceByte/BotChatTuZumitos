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

db.sync()
  .then(() => {
    console.log("Base de datos y tablas creadas si no existen.");
  })
  .catch((error) => {
    console.error("Error al sincronizar las tablas:", error);
  });

module.exports = MBranch;
