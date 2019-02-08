const webpack = require('webpack');

module.exports = {
  output: {
    library: 'JobCloudSDK',
    libraryTarget: 'umd',
  },

  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' }],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
  ],
};
