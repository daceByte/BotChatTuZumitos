const { Router } = require("express");
const logger = require("../../middleware/logger.js");
const CClient = require("../controllers/CCLient.js");
const router = Router();

router.get("/all", async (req, res) => {
  try {
    const response = await CClient.all();
    res.json(response);
  } catch (error) {
    console.log(error);
    logger.child(ctx).error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    const response = await CClient.get(req.params.id);
    res.json(response);
  } catch (error) {
    console.log(error);
    logger.child(ctx).error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/create", async (req, res) => {
  try {
    const response = await CClient.create(req.body);
    res.json(response);
  } catch (error) {
    console.log(error);
    logger.child(ctx).error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/update", async (req, res) => {
  try {
    const response = await CClient.get(req.body);
    res.json(response);
  } catch (error) {
    console.log(error);
    logger.child(ctx).error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
