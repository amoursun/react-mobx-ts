
const merge = require('webpack-merge');
const baseWebpackConfig = require('../webpack-config/webpack.config.base');
const webpackApiMocker = require('webpack-api-mocker');

const path = require('path');
const webpack = require('webpack');
const env = require('../basic-config/env.config');
const utils = require('../basic-config/utils');

const mocker = path.resolve(__dirname, '../../_mocker_/index.js');

// const webpackConfig = merge(baseWebpackConfig, {
//   mode: 'development', // webpack4新增属性，默认返回production,提供一些默认配置，例如cache:true
//   devtool: 'cheap-module-eval-source-map',
//   // source-map每个module生成对应的map文件
//   // eval 每一个module模块执行eval，不生成map文件，在尾部生成一个sourceURL对应前后关系，所以更快
//   // cheap 列信息 VLQ编码
//   // module 包含了模块之间的sourcemap
//
//   devServer: { // 配置webpack-dev-server， 在本地启动一个服务器运行
//     contentBase: utils.p(env.PATH.src),// 配置开发服务运行时的文件根目录
//     overlay: true, // 如果代码出错，会在浏览器页面弹出“浮动层”
//     host: env.HOST, // 服务器的ip地址 希望服务器外可以访问就设置 0.0.0.0
//     port: env.PORT, // 端口
//     open: true, // 自动打开页面
//     hot: env.HOT,
//     inline: env.INLINE,
//     historyApiFallback: true, // 热更新之后, 不会报(React-router v4 -) cannot GET *url*
//     https: env.HTTPS,
//     before(app) {
//       webpackApiMocker(app, mocker);
//     },
//     // 接口代理
//     proxy: {
//       '/api/*': {
//         target: 'http://localhost:3001', // 接口地址域名
//         secure: false, // https接口参数为true, http接口参数为false
//         changeOrigin: true, // 如果接口跨域，需要进行这个参数配置为true
//         // pathRewrite: { // pathRewrite来重写地址
//         //     '/api': '/'
//         // }
//       }
//     }
//   },
//   plugins: [
//     // 热更新相关
//     new webpack.HotModuleReplacementPlugin(),
//     new webpack.DefinePlugin({
//       'process.env.NODE_ENV': '"development"',
//       '__PRODUCTION__': false,
//       '__DEVELOPMENT__': true,
//       '__DEVTOOLS__': true
//     }),
//     new webpack.NamedModulesPlugin(),
//
//   ],
//   optimization: {
//     nodeEnv: 'development',
//   }
// });

const webpackConfig = {
  mode: 'development', // webpack4新增属性，默认返回production,提供一些默认配置，例如cache:true
  devtool: 'cheap-module-eval-source-map',
  // devtool: 'cheap-source-map',
  // source-map每个module生成对应的map文件
  // eval 每一个module模块执行eval，不生成map文件，在尾部生成一个sourceURL对应前后关系，所以更快
  // cheap 列信息 VLQ编码
  // module 包含了模块之间的sourcemap

  plugins: [
    // 热更新相关
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
      '__PRODUCTION__': false,
      '__DEVELOPMENT__': true,
      '__DEVTOOLS__': true
    }),
    new webpack.NamedModulesPlugin(),

  ],
  optimization: {
    nodeEnv: 'development',
  }
};

module.exports = webpackConfig;
