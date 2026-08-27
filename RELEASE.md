# Releases — preview-button-multidomain

**[strapi-plugin-preview-button](https://www.npmjs.com/package/strapi-plugin-preview-button)**, extended for **multiple domains and locales**.

**Package:** `preview-button-multidomain`  
**Current version:** `1.0.0-beta.0` (npm dist-tag **`beta`** — not `latest`)  
**Source:** [BrainStation-23/strapi-preview-multidomain-plugin](https://github.com/BrainStation-23/strapi-preview-multidomain-plugin)  
**Create GitHub release:** [New release](https://github.com/BrainStation-23/strapi-preview-multidomain-plugin/releases/new)  
**Organization:** [BrainStation-23](https://github.com/BrainStation-23)  
**Author:** Abu Sayed (Sayedbs / [sayed021](https://github.com/sayed021))

## What this adds to strapi-plugin-preview-button

| From [strapi-plugin-preview-button](https://www.npmjs.com/package/strapi-plugin-preview-button) | From this package |
| --- | --- |
| Open draft preview, Copy link, live view | Locale / slug → frontend **host** |
| URL templates & entry field mapping | `{host}` substitution for multi-domain / multi-locale |

Required peer: [`strapi-plugin-preview-button@^3`](https://www.npmjs.com/package/strapi-plugin-preview-button). Enable `'preview-button': true` alongside this package.

## Install (beta only for now)

```bash
npm install preview-button-multidomain@beta strapi-plugin-preview-button@^3
# or pin:
npm install preview-button-multidomain@1.0.0-beta.0 strapi-plugin-preview-button@^3
```

Do **not** use a plain `1.0.0` / `latest` publish until you intentionally promote a stable release.

## Maintainer: GitHub release + npm beta

### 1. Prep locally

```bash
cd preview-button-multidomain
# package.json version must be semver-beta, e.g. 1.0.0-beta.0
npm test && npm run build && npm run verify
```

### 2. GitHub release (creates the tag)

Open: https://github.com/BrainStation-23/strapi-preview-multidomain-plugin/releases/new

| Field | Value |
| --- | --- |
| Tag | `v1.0.0-beta.0` (create new tag on publish) |
| Target | branch with the release commit (e.g. `main`) |
| Title | `v1.0.0-beta.0` |
| Set as | **pre-release** (not latest release) |
| Description | Short notes + install: `npm install preview-button-multidomain@beta` |

Publish the release on GitHub first (or in parallel after push).

### 3. npm publish with `beta` tag

```bash
npm whoami
npm publish --access public --tag beta
```

- `--tag beta` → `npm install preview-button-multidomain@beta`
- Default `npm install preview-button-multidomain` will **not** pick this until you later publish with `--tag latest`

### 4. Later betas

Bump `1.0.0-beta.1`, `1.0.0-beta.2`, … → new GitHub pre-release tag → `npm publish --tag beta` again.

### 5. Promote to stable (later)

When ready (not for this beta):

```bash
# set version to 1.0.0 (or next stable)
npm publish --access public --tag latest
```

Create a non-pre-release on GitHub: https://github.com/BrainStation-23/strapi-preview-multidomain-plugin/releases/new

## Prerequisites

- Strapi 5.x
- [strapi-plugin-preview-button@^3](https://www.npmjs.com/package/strapi-plugin-preview-button)
- Both plugins in `config/plugins` (`'preview-button': true` required)

## Tester notes

- Host env values must be **absolute** URLs (`https://stage.example.de`), not bare hostnames.
- `domains[].env` / `defaultEnv` must match `.env` keys exactly.
- This plugin only replaces `{host}`; other tokens come from [strapi-plugin-preview-button](https://www.npmjs.com/package/strapi-plugin-preview-button).

## Links

- README: [README.md](./README.md)
- New GitHub release: https://github.com/BrainStation-23/strapi-preview-multidomain-plugin/releases/new
- Issues: https://github.com/BrainStation-23/strapi-preview-multidomain-plugin/issues
- Dependency (npm): https://www.npmjs.com/package/strapi-plugin-preview-button
