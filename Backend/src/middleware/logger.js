const { createLogger, format, transports } = require("winston");
const path = require("path");

const logFormat = format.combine(
  format.timestamp({ format: "DD.MM.YYYY HH:mm:ss a" }),
  format.prettyPrint(),
  format.printf(
    (content) =>
      `[${content.timestamp}] - [${content.level.toUpperCase()}] ${
        content.ctx
      } - ${content.message}`
  )
);

const logger = createLogger({
  format: logFormat,
  service: "process",
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(__dirname, "../logs", "error.log"),
      level: "error",
    }),
    new transports.File({
      filename: path.join(__dirname, "../logs", "combined.log"),
    }),
  ],
});

module.exports = logger;
