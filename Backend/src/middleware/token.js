const jwt = require("jsonwebtoken");

const config = require("../utils/configServer.js");
const logger = require("./logger.js");

async function sign(id, last) {
  try {
    const json = {
      id: id,
      last: last,
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
  return (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        logger.error("No token provided");
        return res.status(403).send({
          success: false,
          body: "No tienes permiso para realizar esta acción",
        });
      }

      jwt.verify(token, config.token, (err, decoded) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            logger.error("Expired token: " + err.message);
            return res
              .status(401)
              .send({ success: false, body: "El token ha expirado" });
          } else {
            logger.error("Error verificando el token: " + err.message);
            return res
              .status(500)
              .send({ success: false, body: "Error interno del servidor" });
          }
        }

        req.adm_id = decoded.id;
        req.adm_last_login = decoded.last;
        logger.child(ctxToken).info("Token verified successfully");
        next();
      });
    } catch (error) {
      console.log(error);
      logger.error("Error verificando el token: " + error.message);
      return res
        .status(500)
        .send({ success: false, body: "Error interno del servidor" });
    }
  };
}

module.exports = {
  sign,
  verifyToken,
};
