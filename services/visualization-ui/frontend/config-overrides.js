const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    http: require.resolve('stream-http'), // Add polyfill for 'http'
    https: require.resolve('https-browserify'), // Add polyfill for 'https' if needed
    stream: require.resolve('stream-browserify'), // Add polyfill for 'stream'
    buffer: require.resolve('buffer'), // Add polyfill for 'buffer'
  };

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'], // Provide Buffer globally
      process: 'process/browser', // Provide process globally
    }),
  ]);

  return config;
};
