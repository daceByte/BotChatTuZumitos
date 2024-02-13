const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");
require("./src/utils/database.js");

const config = require("./src/utils/configServer.js");
const api = require("./src/server/index");
const logger = require("./src/middleware/logger.js");
const { sv } = require("./src/utils/constans.js");
const bot = require("./src/whatsapp/index.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", api);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

bot.index(io);

server.listen(config.port, (error) => {
  if (!error)
    logger
      .child(sv)
      .info(`Server running on ${config.env} port :${config.port}`);
  else logger.child(sv).fatal(error);
});
