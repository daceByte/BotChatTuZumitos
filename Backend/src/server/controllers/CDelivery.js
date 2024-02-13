const MDelivery = require("../models/MDelivery.js");
const logger = require("../../middleware/logger.js");
const { apiDelivery } = require("../../utils/constans.js");
const ctx = {
  ctx: apiDelivery + "[CONTROLLER] [CDelivery]",
};

const CDelivery = {
  async all() {
    try {
      const deliveries = await MDelivery.findAll();
      return { success: true, body: deliveries };
    } catch (error) {
      console.log(error);
      logger.child(ctx).error(error);
      return { success: false, error };
    }
  },

  async get(id) {
    try {
      const delivery = await MDelivery.findOne({
        where: {
          del_id: id,
        },
      });
      return { success: true, body: delivery };
    } catch (error) {
      console.log(error);
      logger.child(ctx).error(error);
      return { success: false, error };
    }
  },

  async create(data) {
    try {
      await MDelivery.create(data);
      return { success: true };
    } catch (error) {
      console.log(error);
      logger.child(ctx).error(error);
      return { success: false, error };
    }
  },

  async update(id, data) {
    try {
      await MDelivery.update(data, {
        where: {
          del_id: id,
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
      await MDelivery.destroy({
        where: {
          del_id: id,
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

module.exports = CDelivery;
