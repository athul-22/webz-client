const webpack = require('webpack'); 
module.exports = function override(config) { 
		const fallback = config.resolve.fallback || {}; 
		Object.assign(fallback, { 
                process: require.resolve("process/browser"),
                zlib: require.resolve("browserify-zlib"),
                stream: require.resolve("stream-browserify"),
                util: require.resolve("util"),
                buffer: require.resolve("buffer"),
                asset: require.resolve("assert"),
                fs: require.resolve('browserify-fs')
      }) 
   config.resolve.fallback = fallback; 
   config.plugins = (config.plugins || []).concat([ 
   	new webpack.ProvidePlugin({ 
        Buffer: ['buffer', 'Buffer'],
    	process: 'process/browser'
    }) 
   ]) 
   return config; }