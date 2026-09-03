# Release notes

## 1.0.0

### Added

- Configurable `domains[]` mapping locale and slug to frontend hosts, extending [strapi-plugin-preview-button](https://www.npmjs.com/package/strapi-plugin-preview-button)
- Optional `defaultEnv` fallback when locale/slug do not match
- `contentTypes` on this plugin, mirrored onto `preview-button` at bootstrap
- Admin `GET /preview-button-multidomain/config` for public host URLs (env resolved on the server)
- `{host}` substitution in draft/published URL templates via `plugin/preview-button/before-build-url`

### Changed

- First stable release (`1.0.0`, npm `latest`) after `1.0.0-beta.0`
- Plugin package / id: `preview-button-multidomain`

### Fixed

- Null-safe `{host}` replace (does not inject `undefined` when host is missing)
- Empty or unset domain env values are skipped instead of breaking URL build

## 1.0.0-beta.0

### Added

- First public beta of multi-domain / multi-locale host selection for strapi-plugin-preview-button
