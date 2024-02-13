const { Router } = require("express");
const RClient = require("./routes/RClient");

const router = Router();

router.use("/client", RClient);

module.exports = router;
