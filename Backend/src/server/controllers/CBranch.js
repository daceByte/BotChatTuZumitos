const MBranch = require("../models/MBranch.js");
const logger = require("../../middleware/logger.js");
const { apiBranch } = require("../../utils/constans.js");
const ctx = {
  ctx: apiBranch + "[CONTROLLER] [CBranch]",
};

const CBranch = {
  async all() {
    try {
      const branchs = await MBranch.findAll();
      return { success: true, body: branchs };
    } catch (error) {
      console.log(error);
      logger.child(ctx).error(error);
      return { success: false, error };
    }
  },

  async get(id) {
    try {
      const branch = await MBranch.findOne({
        where: {
          bra_id: id,
        },
      });
      return { success: true, body: branch };
    } catch (error) {
      console.log(error);
      logger.child(ctx).error(error);
      return { success: false, error };
    }
  },

  async create(data) {
    try {
      await MBranch.create(data);
      return { success: true };
    } catch (error) {
      console.log(error);
      logger.child(ctx).error(error);
      return { success: false, error };
    }
  },

  async update(data) {
    try {
      await MBranch.update(data, {
        where: {
          bra_id: data.id,
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
      await MBranch.destroy({
        where: {
          bra_id: id,
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

module.exports = CBranch;
