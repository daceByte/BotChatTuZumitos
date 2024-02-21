const { Router } = require("express");
const logger = require("../../middleware/logger.js");
const CDelivery = require("../controllers/CDelivery.js");
const { apiClient } = require("../../utils/constans.js");
const router = Router();

const ctx = {
  ctx: apiClient + "[ROUTER] [RClient]",
};

router.get("/all/query/:page/:searchTerm/:phoneTherm", async (req, res) => {
  try {
    const pageSize = 10;
    const page = req.params.page || 1;
    const offset = (page - 1) * pageSize;
    const searchTerm = req.params.searchTerm || "";
    const phoneTherm = req.params.phoneTherm || "";

    const response = await CDelivery.allQuery(
      page,
      pageSize,
      offset,
      searchTerm,
      phoneTherm
    );
    res.json(response);
  } catch (error) {
    console.log(error);
    logger.child(ctx).error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/all/query/:page//", async (req, res) => {
  try {
    const pageSize = 10;
    const page = req.params.page || 1;
    const offset = (page - 1) * pageSize;
    const searchTerm = req.params.searchTerm || "";
    const phoneTherm = req.params.phoneTherm || "";

    const response = await CDelivery.allQuery(
      page,
      pageSize,
      offset,
      searchTerm,
      phoneTherm
    );
    res.json(response);
  } catch (error) {
    console.log(error);
    logger.child(ctx).error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/all/query/:page", async (req, res) => {
  try {
    const pageSize = 10;
    const page = req.params.page || 1;
    const offset = (page - 1) * pageSize;

    const response = await CDelivery.allQuery(page, pageSize, offset, "", "");
    res.json(response);
  } catch (error) {
    console.log(error);
    logger.child(ctx).error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const response = await CDelivery.all();
    res.json(response);
  } catch (error) {
    console.log(error);
    logger.child(ctx).error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    const response = await CDelivery.get(req.params.id);
    res.json(response);
  } catch (error) {
    console.log(error);
    logger.child(ctx).error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/create", async (req, res) => {
  try {
    const response = await CDelivery.create(req.body);
    res.json(response);
  } catch (error) {
    console.log(error);
    logger.child(ctx).error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/update", async (req, res) => {
  try {
    const response = await CDelivery.update(req.body);
    res.json(response);
  } catch (error) {
    console.log(error);
    logger.child(ctx).error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
