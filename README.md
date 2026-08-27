# preview-button-multidomain

Strapi 5 extender for [strapi-plugin-preview-button](https://github.com/mattmilburn/strapi-plugin-preview-button). Adds **multi-domain** preview hosts by resolving locale/slug → frontend URL and substituting `{host}` in draft/published templates.

## Features

- Multi-domain host selection via `plugin/preview-button/before-build-url`
- Configurable `domains[]` mapped to exact `.env` keys (no hard-coded country switches)
- Single consumer config: put `contentTypes` on this plugin; mirrored onto `preview-button` at bootstrap
- Optional `defaultEnv` fallback when locale/slug do not match
- Locale match first, then slug (slug can override); null-safe `{host}` replace
- Bundler-safe: server resolves env → URLs; admin fetches public config
- Configure example mixes one multi-language host (DACH) with additional hosts (e.g. English)

## Prerequisites

- Strapi 5.x
- `strapi-plugin-preview-button@^3` installed **and** enabled (`'preview-button': true`)

npm/peer install does **not** auto-enable upstream in Strapi. Both plugins must appear in `config/plugins`.

## Install

```bash
npm install preview-button-multidomain strapi-plugin-preview-button@^3
```

## Configure `config/plugins`

### 1. Primary example

Mix patterns in one `domains` list: **one host for several languages** (DACH), plus **another host** for English.

| URL part | Who covers it |
| --- | --- |
| Host | **This plugin** — `{host}` from the matched `domains` row |
| Path prefix (`/de_DE/`, `/de_AT/`, …) | **Not this plugin** — `{localePath}` (or another mapped entry field) in the template |
| Page slug | **Upstream** `preview-button` via `{slug}` |

```js
// config/plugins.ts
export default ({ env }) => ({
  'preview-button-multidomain': {
    enabled: true,
    config: {
      domains: [
        {
          env: 'STRAPI_ADMIN_DOMAIN_DACH',
          locales: ['de-DE', 'de-AT', 'de-CH'],
          // host matching only — does NOT insert /de_AT/ into the URL
          slugs: ['de_DE', 'de_AT', 'de_CH'],
        },
        {
          env: 'STRAPI_ADMIN_DOMAIN_ENGLISH_1',
          locales: ['en-GB'],
          slugs: ['en'],
        },
      ],
      defaultEnv: 'STRAPI_ADMIN_DOMAIN_DACH',
      contentTypes: [
        {
          uid: 'api::page.page',
          draft: {
            // {host} = this plugin; {localePath}/{slug} = upstream/entry fields
            url: `{host}/{localePath}/{slug}?secret=${env('PREVIEW_SECRET')}&status=draft`,
          },
          published: {
            url: `{host}/{localePath}/{slug}`,
          },
        },
      ],
    },
  },

  // Required — npm dependency does not auto-enable Strapi plugins
  'preview-button': true,
});
```

```bash
STRAPI_ADMIN_DOMAIN_DACH=https://mydomain.com
STRAPI_ADMIN_DOMAIN_ENGLISH_1=https://english.example.com
PREVIEW_SECRET=your-preview-secret
```

Prefer `STRAPI_ADMIN_*` for admin-related hosts. There is **no** auto-prefix: `env` is the exact `process.env` key.

This plugin does **not** auto-convert `de-AT` → `/de_AT/`.

**Single locale, single slug** (one language → one host):

```js
{
  env: 'STRAPI_ADMIN_DOMAIN_GERMAN',
  locales: ['de-DE'],
  slugs: ['de_DE'],
},
```

### 2. More hosts (optional)

Add more rows the same way — each `env` is a different host:

```js
domains: [
  {
    env: 'STRAPI_ADMIN_DOMAIN_DACH',
    locales: ['de-DE', 'de-AT', 'de-CH'],
    slugs: ['de_DE', 'de_AT', 'de_CH'],
  },
  {
    env: 'STRAPI_ADMIN_DOMAIN_ENGLISH_1',
    locales: ['en-GB'],
    slugs: ['en'],
  },
  {
    env: 'STRAPI_ADMIN_DOMAIN_FRENCH',
    locales: ['fr', 'fr-FR'],
    slugs: ['fr'],
  },
],
defaultEnv: 'STRAPI_ADMIN_DOMAIN_DEFAULT',
```

```bash
STRAPI_ADMIN_DOMAIN_DACH=https://mydomain.com
STRAPI_ADMIN_DOMAIN_ENGLISH_1=https://english.example.com
STRAPI_ADMIN_DOMAIN_FRENCH=https://french.example.com
STRAPI_ADMIN_DOMAIN_DEFAULT=https://www.example.com
```

### Resolution rules

1. Match `data.locale` against `domains[].locales`
2. Then match `data.slug` against `domains[].slugs` (slug can override; host matching only — does not write path prefixes)
3. Else use `defaultEnv` URL when set
4. Missing env values are skipped (domain omitted); unmatched entries do not inject `undefined` into URLs

### Dual-config fallback

If extender `contentTypes` is empty, contentTypes already configured on `preview-button` still work. Prefer the single extender config above.

## Migration from `preview-button-before-build`

1. Replace package / plugin key with `preview-button-multidomain`
2. Move host selection into `config.domains` (+ `defaultEnv`) instead of hard-coded DE/AT/CH envs
3. Move `contentTypes` onto this plugin’s `config` (optional but recommended)
4. Keep `'preview-button': true`

## Develop

```bash
npm run build
npm run verify
npm test
```
