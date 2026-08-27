import { Initializer } from './components/Initializer';
import { PLUGIN_ID } from './pluginId';
import { getCachedPublicConfig, loadPublicConfig } from './utils/publicConfig';
import { replaceHostInState } from './utils/replaceHostInState';
import { resolveClientUrl } from './utils/resolveClientUrl';

async function ensurePublicConfig() {
  const cached = getCachedPublicConfig();
  if (cached.domains.length > 0 || cached.defaultUrl) {
    return cached;
  }

  try {
    const { getFetchClient } = await import('@strapi/strapi/admin');
    const { get } = getFetchClient();
    return await loadPublicConfig(get);
  } catch {
    return getCachedPublicConfig();
  }
}

export default {
  register(app) {
    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
  },

  bootstrap(app) {
    app.registerHook(
      'plugin/preview-button/before-build-url',
      async ({ data, draft, published }) => {
        const publicConfig = await ensurePublicConfig();
        const clientUrl = resolveClientUrl(data, publicConfig);

        return {
          draft: replaceHostInState(draft, clientUrl),
          published: replaceHostInState(published, clientUrl),
        };
      }
    );
  },
};
