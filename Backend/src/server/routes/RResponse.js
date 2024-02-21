const { Router } = require("express");
const logger = require("../../middleware/logger.js");
const CResponse = require("../controllers/CResponse.js");
const { apiBranch } = require("../../utils/constans.js");
const router = Router();

const ctx = {
  ctx: apiBranch + "[ROUTER] [RLocation]",
};

router.get("/all", async (req, res) => {
  try {
    const response = await CResponse.all();
    res.json(response);
  } catch (error) {
    console.log(error);
    logger.child(ctx).error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    const response = await CResponse.get(req.params.id);
    res.json(response);
  } catch (error) {
    console.log(error);
    logger.child(ctx).error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const response = await CResponse.delete(req.params.id);
    res.json(response);
  } catch (error) {
    console.log(error);
    logger.child(ctx).error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/create", async (req, res) => {
  try {
    const response = await CResponse.create(req.body);
    res.json(response);
  } catch (error) {
    console.log(error);
    logger.child(ctx).error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/update", async (req, res) => {
  try {
    const response = await CResponse.update(req.body);
    res.json(response);
  } catch (error) {
    console.log(error);
    logger.child(ctx).error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
