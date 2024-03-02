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
    res_title: {
      type: Sequelize.STRING,
    },
  },
  {
    tableName: "tbl_response",
  }
);

db.sync()
  .then(() => {
    console.log("Base de datos y tablas creadas si no existen.");
  })
  .catch((error) => {
    console.error("Error al sincronizar las tablas:", error);
  });

module.exports = MResponse;
