const merge = require('webpack-merge');
const baseWebpackConfig = require('../webpack-config/webpack.config.base');

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 引入清除文件插件
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


const copyPlugin = require('../webpack-config/plugins/copy')

const env = require('../basic-config/env.config');
const utils = require('../basic-config/utils');

// module.exports = merge(baseWebpackConfig, {
//   // 模式
//   mode: 'production',
//   // 调试工具
//   devtool: '#source-map',
//   // 输出
//   output: {
//     path: env.PATH.prod,
//     filename: 'js/[name].[chunkhash].js',
//   },
//   // 插件
//   plugins: [
//     // new CleanWebpackPlugin(['dest'], {
//     //     root: path.resolve(__dirname, '../') // webpack打包报错：clean-webpack-plugin only accepts an options object
//     // }),
//     new webpack.DefinePlugin({
//       'process.env.NODE_ENV': '"production"',
//       '__PRODUCTION__': true,
//       '__DEVELOPMENT__': false,
//       '__DEVTOOLS__': false
//     }),
//     new webpack.DllReferencePlugin({
//       context: utils.p(env.PATH.src),
//       manifest: require(utils.p(env.PATH.dllProd + '/vendor-manifest.json'))
//     }),
//     new CleanWebpackPlugin(),
//     new webpack.HashedModuleIdsPlugin()
//   ],
// });

module.exports = {
  // 模式
  mode: 'production',
  // 插件
  plugins: [
    // new CleanWebpackPlugin(['dest'], {
    //     root: path.resolve(__dirname, '../') // webpack打包报错：clean-webpack-plugin only accepts an options object
    // }),
    copyPlugin,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      '__PRODUCTION__': true,
      '__DEVELOPMENT__': false,
      '__DEVTOOLS__': false
    }),
    new webpack.DllReferencePlugin({
      context: utils.p(env.PATH.src),
      manifest: require(utils.p(env.PATH.dllProd + '/vendor-manifest.json'))
    }),
    // new CleanWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin()
  ],
};
