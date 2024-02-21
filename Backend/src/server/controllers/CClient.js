const MClient = require("../models/MClient.js");
const logger = require("../../middleware/logger.js");
const { apiClient } = require("../../utils/constans.js");
const MLocation = require("../models/MLocation.js");
const MBranch = require("../models/MBranch.js");
const { Op } = require("sequelize");
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

  async allQuery(page, pageSize, offset, fullNameSearchTerm, phoneSearchTerm) {
    try {
      const clients = await MClient.findAll({
        include: [{ model: MBranch }],
        where: {
          [Op.or]: [
            {
              cli_fullname: {
                [Op.like]: `%${fullNameSearchTerm}%`,
              },
            },
            {
              cli_phone: {
                [Op.like]: `%${phoneSearchTerm}%`,
              },
            },
          ],
        },
        limit: pageSize,
        offset: offset,
      });

      const totalClients = await MClient.count({
        where: {
          [Op.and]: [
            {
              cli_fullname: {
                [Op.like]: `%${fullNameSearchTerm}%`,
              },
            },
            {
              cli_phone: {
                [Op.like]: `%${phoneSearchTerm}%`,
              },
            },
          ],
        },
      });

      const totalPages = Math.ceil(totalClients / pageSize);

      const isLastPage = page === totalPages;

      return {
        success: true,
        body: {
          clients: clients,
          totalPages: totalPages == 0 ? 1 : totalPages,
          currentPage: page,
          isLastPage,
        },
      };
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
      return { success: true, body: { client, locations } };
    } catch (error) {
      console.log(error);
      logger.child(ctx).error(error);
      return { success: false, error };
    }
  },

  async create(data) {
    try {
      const client = await MClient.create(data);
      const count = await MLocation.count({
        where: {
          fk_loc_cli_id: client.cli_id,
        },
      });
      await MLocation.create({
        ...data,
        fk_loc_cli_id: client.cli_id,
        loc_default: count == 0 ? 1 : null,
      });
      return { success: true };
    } catch (error) {
      console.log(error);
      logger.child(ctx).error(error);
      return { success: false, error };
    }
  },

  async update(data) {
    try {
      await MClient.update(data, {
        where: {
          cli_id: data.cli_id,
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
