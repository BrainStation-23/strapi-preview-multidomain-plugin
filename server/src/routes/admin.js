'use strict';

module.exports = {
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/config',
      handler: 'config.get',
      config: {
        policies: [],
      },
    },
  ],
};
