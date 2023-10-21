const path = require('path');
const webpack = require('webpack');

module.exports = {
  // Your existing webpack configuration options go here

  resolve: {
    fallback: {
      "zlib": require.resolve("browserify-zlib"),
      "querystring": require.resolve("querystring-es3"),
      "crypto": require.resolve("crypto-browserify"),
      "fs": false,
      "http": false,
      "net": false
    },
  },

  plugins: [
    // Your existing plugins go here
  ],
};
