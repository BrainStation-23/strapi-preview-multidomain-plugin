'use strict';

/**
 * Null-safe `{host}` substitution on a draft/published state object.
 *
 * @param {object | null | undefined} state
 * @param {string | undefined} clientUrl
 * @returns {object | null | undefined}
 */
function replaceHostInState(state, clientUrl) {
  if (!state || typeof state !== 'object') {
    return state;
  }

  if (typeof state.url !== 'string' || !clientUrl) {
    return state;
  }

  return {
    ...state,
    url: state.url.split('{host}').join(clientUrl),
  };
}

module.exports = { replaceHostInState };
