const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const utils = require('../basic-config/utils')
const names = require('../webpack-config/name.config');
const env = require('../basic-config/env.config');

const dllProdConfig = {
  mode: 'production',
  context: utils.p(env.PATH.root), // env.PATH.src
  entry: {
    vendor: names.dependencies.concat([/*添加其他依赖*/]),
  },
  output: {
    path: env.PATH.dllProd,
    filename: '[name].bundle.[chunkhash:6].js',
    library: 'dll_[name]_lib',
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          warnings: false,
          // parse: {},
          // compress: {},
          // mangle: true, // Note `mangle.properties` is `false` by default.
          // output: null,
          // toplevel: false,
          // nameCache: null,
          // ie8: false,
          // keep_fnames: false,
        }
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  module:  {
    rules: require(utils.p(env.PATH.webpackConfig + '/loader.base'))(env.DEV)
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': 'production',
      '__PRODUCTION__': true,
      '__DEVELOPMENT__': false,
      '__DEVTOOLS__': false
    }),
    new webpack.DllPlugin({
      // manifest.json文件的输出位置
      path: utils.p(env.PATH.dllProd + '/[name]-manifest.json'),
      // path: path.resolve(staticDir, 'dll-prod', '[name]-manifest.dll.json'),
      // 定义打包的公共vendor文件对外暴露的函数名
      name: 'dll_[name]_lib',
      context: utils.p(env.PATH.root) // utils.p(env.PATH.src),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].bundle.[chunkhash:6].css',
      allChunks: true,
    }),
  ],
};

module.exports = dllProdConfig;

