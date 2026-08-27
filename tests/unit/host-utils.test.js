'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

const { resolveClientUrl } = require('../../admin/src/utils/resolveClientUrl');
const { replaceHostInState } = require('../../admin/src/utils/replaceHostInState');
const { buildPublicConfig } = require('../../server/src/utils/buildPublicConfig');
const configModule = require('../../server/src/config');

const samplePublic = {
  domains: [
    {
      locales: ['de-DE'],
      slugs: ['de_DE'],
      url: 'https://german.example.com',
    },
    {
      locales: ['en', 'en-GB'],
      slugs: ['en'],
      url: 'https://english.example.com',
    },
    {
      locales: ['fr', 'fr-FR'],
      slugs: ['fr'],
      url: 'https://french.example.com',
    },
  ],
  defaultUrl: 'https://www.example.com',
};

describe('resolveClientUrl', () => {
  it('matches locale across domains', () => {
    assert.equal(
      resolveClientUrl({ locale: 'en-GB' }, samplePublic),
      'https://english.example.com'
    );
  });

  it('lets slug override locale', () => {
    assert.equal(
      resolveClientUrl({ locale: 'de-DE', slug: 'fr' }, samplePublic),
      'https://french.example.com'
    );
  });

  it('falls back to defaultUrl', () => {
    assert.equal(
      resolveClientUrl({ locale: 'ja', slug: 'ja' }, samplePublic),
      'https://www.example.com'
    );
  });

  it('returns undefined when nothing matches and no default', () => {
    assert.equal(
      resolveClientUrl({ locale: 'ja' }, { domains: samplePublic.domains }),
      undefined
    );
  });
});

describe('replaceHostInState', () => {
  it('replaces all {host} tokens', () => {
    const next = replaceHostInState(
      { url: '{host}/preview?x=1&host={host}' },
      'https://german.example.com'
    );
    assert.equal(next.url, 'https://german.example.com/preview?x=1&host=https://german.example.com');
  });

  it('is null-safe for missing state or clientUrl', () => {
    assert.equal(replaceHostInState(null, 'https://x'), null);
    assert.deepEqual(replaceHostInState({ url: '{host}/a' }, undefined), {
      url: '{host}/a',
    });
    assert.deepEqual(replaceHostInState({ label: 'Draft' }, 'https://x'), {
      label: 'Draft',
    });
  });
});

describe('buildPublicConfig', () => {
  it('resolves exact env keys and skips empty envs', () => {
    const env = {
      STRAPI_ADMIN_DOMAIN_GERMAN: 'https://german.example.com',
      STRAPI_ADMIN_DOMAIN_ENGLISH_1: '  ',
      STRAPI_ADMIN_DOMAIN_DEFAULT: 'https://www.example.com',
    };

    const publicConfig = buildPublicConfig(
      {
        domains: [
          { env: 'STRAPI_ADMIN_DOMAIN_GERMAN', locales: ['de-DE'], slugs: ['de_DE'] },
          { env: 'STRAPI_ADMIN_DOMAIN_ENGLISH_1', locales: ['en'], slugs: ['en'] },
        ],
        defaultEnv: 'STRAPI_ADMIN_DOMAIN_DEFAULT',
      },
      (name) => {
        const value = env[name];
        if (value == null || String(value).trim() === '') return undefined;
        return String(value).trim();
      }
    );

    assert.deepEqual(publicConfig, {
      domains: [
        {
          locales: ['de-DE'],
          slugs: ['de_DE'],
          url: 'https://german.example.com',
        },
      ],
      defaultUrl: 'https://www.example.com',
    });
  });
});

describe('config.validator', () => {
  it('accepts valid domains config', () => {
    assert.doesNotThrow(() =>
      configModule.validator({
        domains: [{ env: 'STRAPI_ADMIN_DOMAIN_GERMAN', locales: ['de-DE'] }],
        defaultEnv: 'STRAPI_ADMIN_DOMAIN_DEFAULT',
        contentTypes: [],
      })
    );
  });

  it('rejects domains without env', () => {
    assert.throws(
      () => configModule.validator({ domains: [{ locales: ['de-DE'] }] }),
      /requires a non-empty env string/
    );
  });
});
