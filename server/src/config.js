'use strict';

module.exports = {
  default: {
    domains: [],
    defaultEnv: null,
    contentTypes: [],
  },
  validator(config) {
    if (config.domains != null && !Array.isArray(config.domains)) {
      throw new Error('preview-button-multidomain: config.domains must be an array');
    }

    if (config.contentTypes != null && !Array.isArray(config.contentTypes)) {
      throw new Error('preview-button-multidomain: config.contentTypes must be an array');
    }

    (config.domains || []).forEach((entry, index) => {
      if (!entry || typeof entry.env !== 'string' || !entry.env.trim()) {
        throw new Error(
          `preview-button-multidomain: domains[${index}] requires a non-empty env string (exact .env key)`
        );
      }
      if (entry.locales != null && !Array.isArray(entry.locales)) {
        throw new Error(`preview-button-multidomain: domains[${index}].locales must be an array`);
      }
      if (entry.slugs != null && !Array.isArray(entry.slugs)) {
        throw new Error(`preview-button-multidomain: domains[${index}].slugs must be an array`);
      }
    });

    if (config.defaultEnv != null && typeof config.defaultEnv !== 'string') {
      throw new Error('preview-button-multidomain: config.defaultEnv must be a string or null');
    }
  },
};
