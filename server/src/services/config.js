'use strict';

const { PLUGIN_ID } = require('../utils/pluginId');
const { buildPublicConfig, readProcessEnv } = require('../utils/buildPublicConfig');

module.exports = ({ strapi }) => ({
  getRawConfig() {
    return strapi.config.get(`plugin::${PLUGIN_ID}`) || {
      domains: [],
      defaultEnv: null,
      contentTypes: [],
    };
  },

  getPublicConfig() {
    return buildPublicConfig(this.getRawConfig(), readProcessEnv);
  },

  mirrorContentTypesToPreviewButton() {
    const raw = this.getRawConfig();
    const contentTypes = raw.contentTypes;

    if (!Array.isArray(contentTypes) || contentTypes.length === 0) {
      return false;
    }

    const existing = strapi.config.get('plugin::preview-button') || {};
    strapi.config.set('plugin::preview-button', {
      ...existing,
      contentTypes,
    });

    return true;
  },
});
