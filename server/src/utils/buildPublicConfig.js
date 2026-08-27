'use strict';

/**
 * Map raw plugin config + env lookup into public domain URLs (no env names leaked as keys).
 *
 * @param {{ domains?: Array<{ env: string, locales?: string[], slugs?: string[] }>, defaultEnv?: string | null }} raw
 * @param {(name: string) => string | undefined} readEnv
 */
function buildPublicConfig(raw = {}, readEnv = () => undefined) {
  const domains = (raw.domains || [])
    .map((entry) => {
      const url = readEnv(entry.env);
      if (!url) {
        return null;
      }
      return {
        locales: Array.isArray(entry.locales) ? entry.locales : [],
        slugs: Array.isArray(entry.slugs) ? entry.slugs : [],
        url,
      };
    })
    .filter(Boolean);

  return {
    domains,
    defaultUrl: readEnv(raw.defaultEnv) || null,
  };
}

function readProcessEnv(envName) {
  if (!envName || typeof envName !== 'string') {
    return undefined;
  }
  const value = process.env[envName];
  if (value == null || String(value).trim() === '') {
    return undefined;
  }
  return String(value).trim();
}

module.exports = { buildPublicConfig, readProcessEnv };
