const MClient = require("../models/MClient.js");
const logger = require("../../middleware/logger.js");
const { apiClient } = require("../../utils/constans.js");
const MLocation = require("../models/MLocation.js");
const MBranch = require("../models/MBranch.js");
const ctx = {
  ctx: apiClient + "[CONTROLLER] [CClient]",
};

const CClient = {
  async all() {
    try {
      const clients = await MClient.findAll({
        include: [{ model: MBranch }],
      });
      return { success: true, body: clients };
    } catch (error) {
      console.log(error);
      logger.child(ctx).error(error);
      return { success: false, error };
    }
  },

  async get(id) {
    try {
      const client = await MClient.findOne({
        where: {
          cli_id: id,
        },
        include: [{ model: MBranch }],
      });

      const locations = await MLocation.findAll({
        where: {
          fk_loc_cli_id: id,
        },
      });
      return { success: true, body: { ...client, locations } };
    } catch (error) {
      console.log(error);
      logger.child(ctx).error(error);
      return { success: false, error };
    }
  },

  async create(data) {
    try {
      const client = await MClient.create(data);
      await MLocation.create({ ...data, fk_loc_cli_id: client.cli_id });
      return { success: true };
    } catch (error) {
      console.log(error);
      logger.child(ctx).error(error);
      return { success: false, error };
    }
  },

  async update(id, data) {
    try {
      await MClient.update(data, {
        where: {
          cli_id: id,
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
      await MClient.destroy({
        where: {
          cli_id: id,
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

module.exports = CClient;
