const { Router } = require("express");
const logger = require("../../middleware/logger.js");
const CLocation = require("../controllers/CLocation.js");
const { apiClient } = require("../../utils/constans.js");
const router = Router();

const ctx = {
  ctx: apiClient + "[ROUTER] [RLocation]",
};

router.get("/all/:id", async (req, res) => {
  try {
    const response = await CLocation.all(req.params.id);
    res.json(response);
  } catch (error) {
    console.log(error);
    logger.child(ctx).error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    const response = await CLocation.get(req.params.id);
    res.json(response);
  } catch (error) {
    console.log(error);
    logger.child(ctx).error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const response = await CLocation.delete(req.params.id);
    res.json(response);
  } catch (error) {
    console.log(error);
    logger.child(ctx).error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/create", async (req, res) => {
  try {
    const response = await CLocation.create(req.body);
    res.json(response);
  } catch (error) {
    console.log(error);
    logger.child(ctx).error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/update", async (req, res) => {
  try {
    const response = await CLocation.update(req.body);
    res.json(response);
  } catch (error) {
    console.log(error);
    logger.child(ctx).error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
