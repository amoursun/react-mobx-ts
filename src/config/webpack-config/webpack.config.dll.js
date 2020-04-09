var del = require('del')
var env = require('../basic-config/env.config')
var webpack = require('webpack')

del.sync(env.PATH.dllProd, {force: true})
del.sync(env.PATH.dllDev, {force: true})

var dllDevWebpackConfig = require('../dll-config/dll.webpack.config.dev')
var compilerDev = webpack(dllDevWebpackConfig)
compilerDev.run(function (err) {
  if (err) {
    console.error(err)
    return
  }

  console.log('[SUCCESS] dll for Development bundle 编译完成, 请笑纳...')
})

var dllProdWebpackConfig = require('../dll-config/dll.webpack.config.prod');
var compilerProd = webpack(dllProdWebpackConfig);
compilerProd.run(function (err) {
  if (err) {
    console.error(err)
    return
  }

  console.log('[SUCCESS] dll for Production bundle 编译完成, 请笑纳...')
})
