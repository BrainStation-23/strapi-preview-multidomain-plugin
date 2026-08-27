import { useEffect, useRef } from 'react';
import { useFetchClient } from '@strapi/strapi/admin';

import { PLUGIN_ID } from '../pluginId';
import { loadPublicConfig } from '../utils/publicConfig';

/**
 * @type {import('react').FC<{ setPlugin: (id: string) => void }>}
 */
const Initializer = ({ setPlugin }) => {
  const ref = useRef(setPlugin);
  const { get } = useFetchClient();

  useEffect(() => {
    let cancelled = false;

    loadPublicConfig(get)
      .catch(() => {
        // Hook will still run with empty domains; avoid blocking admin boot.
      })
      .finally(() => {
        if (!cancelled) {
          ref.current(PLUGIN_ID);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [get]);

  return null;
};

export { Initializer };
