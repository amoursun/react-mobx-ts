const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// const rootDir = __dirname; // 不需要 path.resolve, __dirname本身就是 resolve 之后的

const utils = require('../basic-config/utils')
const names = require('../webpack-config/name.config');
const env = require('../basic-config/env.config');

const dllDevConfig = {
  mode: 'development',
  context: utils.p(env.PATH.root), // env.PATH.src
  entry: {
    vendor: names.dependencies.concat([/*添加其他依赖*/]),
  },
  output: {
    path: env.PATH.dllDev,
    filename: '[name].bundle.[chunkhash:6].js',
    library: 'dll_[name]_lib',
  },
  // optimization: {}, // dllDev 不需要压缩
  module: {
    rules: require(utils.p(env.PATH.webpackConfig + '/loader.base'))(true)
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
      '__PRODUCTION__': false,
      '__DEVELOPMENT__': true,
      '__DEVTOOLS__': true
    }),
    new webpack.DllPlugin({
      // manifest.json文件的输出位置
      path: utils.p(env.PATH.dllDev + '/[name]-manifest.json'),
      // path: path.resolve(staticDir, 'dll-dev', '[name]-manifest.dll.json'),
      // 定义打包的公共vendor文件对外暴露的函数名
      name: 'dll_[name]_lib',
      context: utils.p(env.PATH.src),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].bundle.[chunkhash:6].css',
      allChunks: true,
    }),
  ],
};

module.exports = dllDevConfig;

