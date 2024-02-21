const MDelivery = require("../models/MDelivery.js");
const logger = require("../../middleware/logger.js");
const { apiDelivery } = require("../../utils/constans.js");
const { Op } = require("sequelize");
const MBranch = require("../models/MBranch.js");
const ctx = {
  ctx: apiDelivery + "[CONTROLLER] [CDelivery]",
};

const CDelivery = {
  async allQuery(page, pageSize, offset, fullNameSearchTerm, phoneSearchTerm) {
    try {
      const clients = await MDelivery.findAll({
        include: [{ model: MBranch }],
        where: {
          [Op.or]: [
            {
              del_fullname: {
                [Op.like]: `%${fullNameSearchTerm}%`,
              },
            },
            {
              del_phone: {
                [Op.like]: `%${phoneSearchTerm}%`,
              },
            },
          ],
        },
        order: [["del_status", "DESC"]],
        limit: pageSize,
        offset: offset,
      });

      const totalClients = await MDelivery.count({
        where: {
          [Op.and]: [
            {
              del_fullname: {
                [Op.like]: `%${fullNameSearchTerm}%`,
              },
            },
            {
              del_phone: {
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
          deliveries: clients,
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

  async update(data) {
    try {
      await MDelivery.update(data, {
        where: {
          del_id: data.del_id,
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
