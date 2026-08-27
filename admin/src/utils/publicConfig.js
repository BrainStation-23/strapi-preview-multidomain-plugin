'use strict';

const { PLUGIN_ID } = require('../pluginId');

const EMPTY = Object.freeze({ domains: [], defaultUrl: null });

let cache = null;
let loadPromise = null;

/**
 * @param {(path: string) => Promise<{ data: any }>} get - fetchClient.get
 */
async function loadPublicConfig(get) {
  if (cache) {
    return cache;
  }

  if (!loadPromise) {
    loadPromise = get(`/${PLUGIN_ID}/config`)
      .then(({ data }) => {
        cache = {
          domains: Array.isArray(data?.domains) ? data.domains : [],
          defaultUrl: data?.defaultUrl || null,
        };
        return cache;
      })
      .catch((error) => {
        loadPromise = null;
        throw error;
      });
  }

  return loadPromise;
}

function getCachedPublicConfig() {
  return cache || EMPTY;
}

/** @internal test helper */
function __resetPublicConfigCache() {
  cache = null;
  loadPromise = null;
}

module.exports = {
  loadPublicConfig,
  getCachedPublicConfig,
  __resetPublicConfigCache,
};
