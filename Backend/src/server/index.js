const { Router } = require("express");
const RClient = require("./routes/RClient");
const RUser = require("./routes/RUser");
const RLocation = require("./routes/RLocation");
const RDelivery = require("./routes/RDelivery");
const RBranch = require("./routes/RBranch");
const RResponse = require("./routes/RResponse");

const router = Router();

router.use("/client", RClient);
router.use("/user", RUser);
router.use("/location", RLocation);
router.use("/delivery", RDelivery);
router.use("/branch", RBranch);
router.use("/response", RResponse);

module.exports = router;
