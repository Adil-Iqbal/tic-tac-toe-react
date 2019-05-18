/* eslint-disable */

const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    path.join(__dirname, './src/index.jsx'),
  ],
  module: {
    rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, 
    {
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'scss-loader',],
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader', 'eslint-loader',]
    },
    ],
  },
};
