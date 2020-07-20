const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const WebpackProgressOraPlugin = require('webpack-progress-ora-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const userConfig = require('../config.js')

const extractLoader = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    publicPath: '..'
  }
}

module.exports = merge(baseConfig, {
  output: {
    filename: 'assets/scripts/[name].[chunkhash].js',
    publicPath: userConfig.build.publicPath
  },
  devtool: 'cheap-module-source-map',
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [extractLoader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/,
        use: [extractLoader, 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css(\?.*)?$/,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: [
          'default',
          {
            discardComments: { removeAll: true }
          }
        ]
      },
      canPrint: true,
    }),
    new WebpackProgressOraPlugin({
      clear: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/styles/[name].[contenthash].css'
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*'],
    }),
    new webpack.NamedChunksPlugin(),
  ],
})
