'use strict';

const { PLUGIN_ID } = require('../utils/pluginId');

module.exports = ({ strapi }) => ({
  async get(ctx) {
    const configService = strapi.plugin(PLUGIN_ID).service('config');
    ctx.body = configService.getPublicConfig();
  },
});
