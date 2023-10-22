const webpack = require('webpack');

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    "crypto": false,
    "http": false,
    "querystring": false ,
  });
  config.resolve.fallback = fallback;

  // Your existing fallback additions
  Object.assign(fallback, {
    "stream": require.resolve("stream-browserify"),
    "assert": require.resolve("assert"),
    "https": require.resolve("https-browserify"),
    "os": require.resolve("os-browserify"),
    "url": require.resolve("url"),
    "querystring": require.resolve("querystring-es3"),
  });

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ]);

  return config;
};
