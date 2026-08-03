# preview-button-multidomain

Addon for [strapi-plugin-preview-button](https://github.com/mattmilburn/strapi-plugin-preview-button). Extends draft/published preview with multi-domain host selection via `plugin/preview-button/before-build-url`.

## Prerequisites

- Strapi 5.x
- `strapi-plugin-preview-button@^3` enabled

## Enable in `config/plugins`

```js
'preview-button-multidomain': {
  enabled: true,
},

'preview-button': {
  enabled: true,
  config: {
    contentTypes: [
      {
        uid: 'api::content-type',
        draft: {
          url: `{host}/api/preview?slug={slug}&contentType=login-page&secret=${process.env.PREVIEW_SECRET}&status=draft`,
        },
        published: {
          url: `{host}/api/preview?slug={slug}&contentType=login-page&secret=${process.env.PREVIEW_SECRET}&status=published`,
        },
      },
    ],
  },
},
```

Migration from the old package name: replace `'preview-button-before-build'` with `'preview-button-multidomain'`.

## Env (names only)

```bash
STRAPI_ADMIN_CLIENT_DE_URL=http://localhost:3000
STRAPI_ADMIN_CLIENT_AT_URL=http://localhost:3001
STRAPI_ADMIN_CLIENT_CH_URL=http://localhost:3002
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,http://localhost:3002
```

(Legacy hard-coded host map; Phase 2 will replace with configurable `STRAPI_ADMIN_DOMAIN_*` domains.)
