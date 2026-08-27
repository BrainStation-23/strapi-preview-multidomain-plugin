'use strict';

/**
 * Resolve frontend host URL from public domain config.
 * Locale is matched first across domains; then slug (slug can override).
 *
 * @param {{ locale?: string, slug?: string }} data
 * @param {{ domains?: Array<{ locales?: string[], slugs?: string[], url?: string }>, defaultUrl?: string | null }} publicConfig
 * @returns {string | undefined}
 */
function resolveClientUrl(data = {}, publicConfig = {}) {
  const domains = Array.isArray(publicConfig.domains) ? publicConfig.domains : [];
  const locale = data.locale;
  const slug = data.slug;

  let matched;

  if (locale != null && locale !== '') {
    matched = domains.find(
      (domain) => Array.isArray(domain.locales) && domain.locales.includes(locale)
    );
  }

  if (slug != null && slug !== '') {
    const bySlug = domains.find(
      (domain) => Array.isArray(domain.slugs) && domain.slugs.includes(slug)
    );
    if (bySlug) {
      matched = bySlug;
    }
  }

  if (matched && matched.url) {
    return matched.url;
  }

  if (publicConfig.defaultUrl) {
    return publicConfig.defaultUrl;
  }

  return undefined;
}

module.exports = { resolveClientUrl };
