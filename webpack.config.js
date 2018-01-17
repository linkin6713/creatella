const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'public/bundle');
const APP_DIR = path.resolve(__dirname, 'src');

const config = {
  entry: {
    js: ['babel-polyfill', APP_DIR + '/index.jsx'], vendor: ['react']
  },
  output: {
    path: BUILD_DIR, filename: '[name].js'
  },
  resolve: {
    extensions: [".js", ".jsx", ".css"]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader'
      }
    ]
  }
};

module.exports = config;