const webpack = require('webpack');

module.exports = function override(config) {
  // Add polyfills for Node.js core modules
  config.resolve.fallback = {
    ...config.resolve.fallback,
    http: require.resolve('stream-http'), // Polyfill for 'http'
    https: require.resolve('https-browserify'), // Polyfill for 'https'
    stream: require.resolve('stream-browserify'), // Polyfill for 'stream'
    buffer: require.resolve('buffer'), // Polyfill for 'buffer'
    process: require.resolve('process/browser'), // Polyfill for 'process'
    querystring: require.resolve('querystring-es3'), // Polyfill for 'querystring'
    path: require.resolve('path-browserify'), // Polyfill for 'path'
    zlib: require.resolve('browserify-zlib'), // Polyfill for 'zlib'
    url: require.resolve('url'), // Polyfill for 'url'
    util: require.resolve('util/'), // Polyfill for 'util'
    assert: require.resolve('assert/'), // Polyfill for 'assert'
    crypto: require.resolve('crypto-browserify'), // Polyfill for 'crypto'
    os: require.resolve('os-browserify/browser'), // Polyfill for 'os'
    fs: false, // Exclude 'fs' as it is not needed in the browser
    net: false, // Exclude 'net' as it is not needed in the browser
    tls: false, // Exclude 'tls' as it is not needed in the browser
    child_process: false, // Exclude 'child_process' as it is not needed in the browser
  };

  // Add plugins to provide global variables for polyfills
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'], // Provide 'Buffer' globally
      process: 'process/browser', // Provide 'process' globally
    }),
  ]);

  return config;
};
