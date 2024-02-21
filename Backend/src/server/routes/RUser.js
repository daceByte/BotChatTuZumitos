const { Router } = require("express");
const logger = require("../../middleware/logger.js");
const CUser = require("../controllers/CUser.js");
const router = Router();

router.post("/login", async (req, res) => {
  try {
    const response = await CUser.login(req.body);
    res.json(response);
  } catch (error) {
    console.log(error);
    logger.child(ctx).error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
