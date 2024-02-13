const MResponse = require("../models/MResponse.js");
const logger = require("../../middleware/logger.js");
const { apiResponse } = require("../../utils/constans.js");
const ctx = {
  ctx: apiResponse + "[CONTROLLER] [CResponse]",
};

const CResponse = {
  async all() {
    try {
      const responses = await MResponse.findAll();
      return { success: true, body: responses };
    } catch (error) {
      console.log(error);
      logger.child(ctx).error(error);
      return { success: false, error };
    }
  },

  async get(id) {
    try {
      const response = await MResponse.findOne({
        where: {
          res_id: id,
        },
      });
      return { success: true, body: response };
    } catch (error) {
      console.log(error);
      logger.child(ctx).error(error);
      return { success: false, error };
    }
  },

  async create(data) {
    try {
      await MResponse.create(data);
      return { success: true };
    } catch (error) {
      console.log(error);
      logger.child(ctx).error(error);
      return { success: false, error };
    }
  },

  async update(id, data) {
    try {
      await MResponse.update(data, {
        where: {
          res_id: id,
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
      await MResponse.destroy({
        where: {
          res_id: id,
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

module.exports = CResponse;
