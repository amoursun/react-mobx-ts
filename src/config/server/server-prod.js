var express = require('express')
var config = require('../basic-config/env.config')
var utils = require('../basic-config/utils')
var nps = require('path')
var fs = require('fs')

var app = express()

app.use('/pages', express.static(config.PATH.prodPages))
app.use('/dll', express.static(config.PATH.prodDll))
app.use('/dist', express.static(config.PATH.prodDist))
app.use('/extra', express.static(config.PATH.prodExtra))


require('../nodemon-server/server-starter').start({
  app: app
})

app.listen(config.PRODPORT, function (err) {
  if (err) {
    utils.log(['error: 启动服务器失败.', err, err.stack])
    return
  }

  utils.log([
    'info: 构建后脚本的测试服务器已启动, 请访问: http://localhost:'
    + config.PRODPORT
  ])
})
