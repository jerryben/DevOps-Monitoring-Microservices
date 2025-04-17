const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    querystring: require.resolve('querystring-es3'),
  };

  return config;
};
