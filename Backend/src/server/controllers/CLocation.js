const MLocation = require("../models/MLocation.js");
const logger = require("../../middleware/logger.js");
const { apiLocation } = require("../../utils/constans.js");
const ctx = {
  ctx: apiLocation + "[CONTROLLER] [CLocation]",
};

const CLocation = {
  async all() {
    try {
      const locations = await MLocation.findAll();
      return { success: true, body: locations };
    } catch (error) {
      console.log(error);
      logger.child(ctx).error(error);
      return { success: false, error };
    }
  },

  async get(id) {
    try {
      const location = await MLocation.findOne({
        where: {
          loc_id: id,
        },
      });
      return { success: true, body: location };
    } catch (error) {
      console.log(error);
      logger.child(ctx).error(error);
      return { success: false, error };
    }
  },

  async create(data) {
    try {
      await MLocation.create(data);
      return { success: true };
    } catch (error) {
      console.log(error);
      logger.child(ctx).error(error);
      return { success: false, error };
    }
  },

  async update(id, data) {
    try {
      await MLocation.update(data, {
        where: {
          loc_id: id,
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
      await MLocation.destroy({
        where: {
          loc_id: id,
        },
      });
      return { success: true };
    } catch (error) {
      console.log(error);
      logger.child(ctx).error(error);
      return { success: false, error };
    }
  },
};

module.exports = CLocation;
