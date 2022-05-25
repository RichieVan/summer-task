const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
require('dotenv').config({ path: './.env' });

const modeStatus = (process.env?.NODE_ENV === 'production') ? 'production' : 'development';

module.exports = {
  mode: modeStatus,
  entry: [
    './src/index.tsx',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'build/project.js',
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        exclude: '/node_modules',
        use: 'ts-loader',
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
      minify: modeStatus === 'production',
      favicon: path.resolve(__dirname, 'src/assets/favicon.ico'),
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets'),
          to: path.resolve(__dirname, 'dist/assets'),
        },
      ],
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.scss', '.css'],
    modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  devServer: {
    compress: true,
    port: 8000,
    client: {
      logging: 'none',
      progress: false,
    },
    static: {
      directory: path.join(__dirname, 'dist'),
      watch: true,
    },
    historyApiFallback: true,
  },
  devtool: 'source-map',
};
