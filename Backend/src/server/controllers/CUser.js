const MResponse = require("../models/MResponse.js");
const logger = require("../../middleware/logger.js");
const { apiResponse } = require("../../utils/constans.js");
const { sign } = require("../../middleware/token.js");
const MAdmin = require("../models/MAdmin.js");
const ctx = {
  ctx: apiResponse + "[CONTROLLER] [CResponse]",
};

const CResponse = {
  async login(data) {
    try {
      const adm = await MAdmin.findOne({
        where: {
          adm_user: data.user,
          adm_pass: data.pass,
        },
      });

      const token = await sign(adm.adm_id, adm.adm_last_login);

      return { success: true, body: { user: adm, token } };
    } catch (error) {
      console.log(error);
      logger.child(ctx).error(error);
      return { success: false, error };
    }
  },

  async all() {
    try {
      const admins = await MAdmin.findAll();
      return { success: true, body: admins };
    } catch (error) {
      console.log(error);
      logger.child(ctx).error(error);
      return { success: false, error };
    }
  },

  async get(id) {
    try {
      const admin = await MAdmin.findOne({
        where: {
          adm_id: id,
        },
      });
      return { success: true, body: admin };
    } catch (error) {
      console.log(error);
      logger.child(ctx).error(error);
      return { success: false, error };
    }
  },

  async create(data) {
    try {
      await MAdmin.create(data);
      return { success: true };
    } catch (error) {
      console.log(error);
      logger.child(ctx).error(error);
      return { success: false, error };
    }
  },

  async update(id, data) {
    try {
      await MAdmin.update(data, {
        where: {
          adm_id: id,
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
      await MAdmin.destroy({
        where: {
          adm_id: id,
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
