const MLocation = require("../models/MLocation.js");
const logger = require("../../middleware/logger.js");
const { apiLocation } = require("../../utils/constans.js");
const ctx = {
  ctx: apiLocation + "[CONTROLLER] [CLocation]",
};

const CLocation = {
  async all(id) {
    try {
      const locations = await MLocation.findAll({
        where: {
          fk_loc_cli_id: id,
        },
      });
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
      const defaultLocation = await MLocation.findOne({
        where: {
          fk_loc_cli_id: data.fk_loc_cli_id,
        },
      });

      if (defaultLocation == null) {
        data.loc_default = 1;
      }

      if (data.loc_default == 1) {
        await MLocation.update(
          {
            loc_default: 0,
          },
          {
            where: {
              fk_loc_cli_id: data.fk_loc_cli_id,
            },
          }
        );
      }
      await MLocation.create(data);
      return { success: true };
    } catch (error) {
      console.log(error);
      logger.child(ctx).error(error);
      return { success: false, error };
    }
  },

  async update(data) {
    try {
      let passed = true;
      if (data.loc_default == 1) {
        await MLocation.update(
          {
            loc_default: 0,
          },
          {
            where: {
              fk_loc_cli_id: data.fk_loc_cli_id,
            },
          }
        );
      } else {
        const location = await MLocation.findOne({
          where: {
            loc_id: data.loc_id,
          },
        });
        if (location.loc_default == 1) {
          passed = false;
        }
      }
      if (passed) {
        await MLocation.update(data, {
          where: {
            loc_id: data.loc_id,
          },
        });
        return { success: true };
      } else {
        return {
          success: false,
          body: "No puedes desactivar la ubicacion predeterminada.",
        };
      }
    } catch (error) {
      console.log(error);
      logger.child(ctx).error(error);
      return { success: false, error };
    }
  },

  async delete(id) {
    try {
      const location = await MLocation.findOne({
        where: {
          loc_id: id,
        },
      });

      if (location.loc_default == 0) {
        await MLocation.destroy({
          where: {
            loc_id: id,
          },
        });
        return { success: true };
      } else {
        return {
          success: false,
          body: "No puedes eliminar la ubicacion predeterminada.",
        };
      }
    } catch (error) {
      console.log(error);
      logger.child(ctx).error(error);
      return { success: false, error };
    }
  },
};

module.exports = CLocation;
