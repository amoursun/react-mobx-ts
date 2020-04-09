
var webpack = require('webpack')
var express = require('express')
var utils = require('../basic-config/utils')
var path = require('path');

var webpackDevMiddleware = require('webpack-dev-middleware')

var utils = require('../basic-config/utils')
var fs = require('fs')
var _ = require('lodash')

var config = require('../basic-config/env.config');

/**
 * 启动 dev server (webpack, 共享项目 check 等)
 *
 * @param {Object} opts 必要参数
 * @return {HttpServer} express 服务器
 */
var serverDevStart = function (opts) {
  /**
   * opts: {}
   *  lifeCycle: {}
   *      $LIFE_CYCLE_STEP_CALLBACK: function(app, context)
   */
  opts = opts || {}
  opts.lifeCycle = opts.lifeCycle || {}
  var logLevel = opts.logLevel || 'debug'

  var app = express()

  var defaultLog = function (message) {
    utils.logs(['info: ' + message])
  }

  utils.log(['', '[Detected entries for webpack]'.magenta + ':'])
  // utils.log(['', config.entries])

  if (opts.lifeCycle.generateHtml) {
    opts.lifeCycle.generateHtml(app, {})
  }

  // 启动 webpack 解析器
  // 得到 webpack 的config之后, 通过计算得到entry列表
  var webpackConfig = opts.lifeCycle.getWebpackConfig()
  var compiler = webpack(webpackConfig)
  // console.log('webpackConfig', webpackConfig)

  app.use(
    webpackDevMiddleware(compiler, {
      logLevel: logLevel === 'silent' ? 'error' : logLevel,
      stats: !['silent'].includes(logLevel) && {
        colors: true,
        context: process.cwd()
      }
    })
  )

  // 如果要在IE下调试, 将以下Hot middleware注释掉
  var webpackHotMiddleware = require('webpack-hot-middleware')
  var hotMiddleware = webpackHotMiddleware(compiler, {log: defaultLog})
  app.use(hotMiddleware)

  if (opts.lifeCycle.loadDevServerLogic) {
    opts.lifeCycle.loadDevServerLogic(app, {})
  }

  var httpServer = require('http').createServer(app)

  var starter = function () {
    httpServer.listen(opts.port, function (err) {
      if (err) {
        console.error(err)
        utils.logs(['error: ' + err])
      } else {
        utils.logs([
          'info: Server run on http://localhost:' + opts.port
        ])
      }
    })
  }
  starter()
  console.log('httpStarter')
  return httpServer;
}

module.exports = serverDevStart



