'use strict';

module.exports = async ({ strapi }) => {
  const previewButton = strapi.plugin('preview-button');

  if (!previewButton) {
    throw new Error(
      [
        'preview-button-multidomain requires strapi-plugin-preview-button to be enabled.',
        "Add 'preview-button': true to config/plugins and install strapi-plugin-preview-button@^3.",
      ].join(' ')
    );
  }

  const configService = strapi.plugin('preview-button-multidomain').service('config');
  const mirrored = configService.mirrorContentTypesToPreviewButton();

  if (mirrored) {
    strapi.log.info(
      '[preview-button-multidomain] Mirrored contentTypes onto plugin::preview-button'
    );
  }
};
