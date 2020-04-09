const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

const devConfig = require('../build-config/webpack.config.dev');
const env = require('../basic-config/env.config');

// 服务器框架
const express = require('express');
const app = express();

const utils = require('../basic-config/utils')

const compiler = webpack(devConfig);

let defaultLog = function (message) {
  utils.logs(['info: ' + message])
}

// 热更新  配置devServer
app.use(
    webpackDevMiddleware(compiler, { // webpack-dev-middleware 用于设置hot为true
        hot: env.HOT,
        inline: env.INLINE,
        color: true,
        historyApiFallback: true,
        open: true,
        overlay: true, // 如果代码出错，会在浏览器页面弹出“浮动层”
        stats: "errors-only" // 为了减少webpack不必要的输出，将stats设为errors-only
    })
);

// 加入热更新中间件
app.use(webpackHotMiddleware(compiler, {log: defaultLog})); // 添加webpack-hot-middleware 用于开启hmr
app.get('*', (request, response) => {
    response.sendFile(path.resolve(env.PATH.static, 'index.html'));
});


// 启动服务
app.listen(env.PORT, env.HOST, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(' start server at port ' + env.PORT);
});


