const MLead = require("../models/MLead.js");
const logger = require("../../middleware/logger.js");
const { apiLead } = require("../../utils/constans.js");
const MBranch = require("../models/MBranch.js");
const ctx = {
  ctx: apiLead + "[CONTROLLER] [CLead]",
};

const CLead = {
  async all() {
    try {
      const leads = await MLead.findAll({
        include: [{ model: MBranch }],
      });
      return { success: true, body: leads };
    } catch (error) {
      console.log(error);
      logger.child(ctx).error(error);
      return { success: false, error };
    }
  },

  async get(id) {
    try {
      const lead = await MLead.findOne({
        where: {
          lea_phone: id,
        },
        include: [{ model: MBranch }],
      });
      return { success: true, body: lead };
    } catch (error) {
      console.log(error);
      logger.child(ctx).error(error);
      return { success: false, error };
    }
  },

  async create(data) {
    try {
      await MLead.create(data);
      return { success: true };
    } catch (error) {
      console.log(error);
      logger.child(ctx).error(error);
      return { success: false, error };
    }
  },

  async update(data) {
    try {
      await MLead.update(data, {
        where: {
          lea_id: data.id,
        },
      });
      return { success: true };
    } catch (error) {
      console.log(error);
      logger.child(ctx).error(error);
      return { success: false, error };
    }
  },

  async delete(id) {
    try {
      return { success: true };
    } catch (error) {
      console.log(error);
      logger.child(ctx).error(error);
      return { success: false, error };
    }
  },
};

module.exports = CLead;
