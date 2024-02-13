const jwt = require("jsonwebtoken");

const config = require("../utils/configServer.js");
const logger = require("./logger.js");

export const rols = {
  ADMIN: "1",
  USER: "0",
};

async function sign(id, email) {
  try {
    const json = {
      user_id: id,
      email,
    };
    const expiration = {
      expiresIn: config.expiration,
    };
    const token = jwt.sign(json, config.token, expiration);

    logger.info("Token generated successfully");

    return token;
  } catch (error) {
    console.log(error);
    logger.error("Error generating token" + error);
  }
}

async function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization;
    if (!token) {
      logger.error("No token provided");
      return res
        .status(403)
        .send({ message: "No tienes permiso para realizar esta acción" });
    }

    jwt.verify(token, config.token, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          logger.error("Expired token: " + err.message);
          return res.status(401).send({ message: "El token ha expirado" });
        } else {
          logger.error("Error verificando el token: " + err.message);
          return res
            .status(500)
            .send({ message: "Error interno del servidor" });
        }
      }

      req.userId = decoded.user_id;
      logger.info("Token verificado exitosamente");
      next();
    });
  } catch (error) {
    console.log(error);
    logger.error("Error verificando el token: " + error.message);
    return res.status(500).send({ message: "Error interno del servidor" });
  }
}

module.exports = {
  sign,
  verifyToken,
};
