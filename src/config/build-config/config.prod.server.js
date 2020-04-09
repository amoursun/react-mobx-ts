
var webpack = require('webpack')
var config = require('../basic-config/env.config')
var utils = require('../basic-config/utils')

var fs = require('fs')
var util = require('util')

var _ = require('lodash')

var del = require('delete')
var cp = require('copy-dir')

module.exports = {
  /**
   *
   *
   * @param opts {{
     *  onBuilt: Function,
     *  buildPlanKey: String,
     *  enableProfiling: Boolean
     * }}
   *
   * onBuilt : 构建完毕回调
   * buildPlanKey : 使用哪一个 build plan, 如 prod 与 build-plans/prod.js 相对应
   * enableProfiling : 是否启用 profile 以检查构建效率情况
   */
  execute(opts) {
    opts = opts || {}

    // console.log('@debug, hello ', opts)

    opts.buildPlanKey = opts.buildPlanKey || 'prod'

    var buildPlanConfig = require(utils.p(
      config.PATH.buildPlans + '/' + opts.buildPlanKey
    ))

    // 获取 webpack
    var fillWebpackConfig = require('./fillWebpackConfig')

    // 清除 prod 内容
    del.sync(config.PATH.prod, {force: true})
    utils.ensurePath(config.PATH.prod)
    utils.ensurePath(config.PATH.prodPages)

    var webpackConfig = fillWebpackConfig(buildPlanConfig, {
      dev: false,
      sourceMap: opts.sourceMap,
      enableProfile: opts.enableProfiling,
      presets: ['babel-polyfill']
    })

    // 手动移动 dll 文件夹
    // AddAssetHtmlPlugin work for this
    // utils.ensurePath(utils.p(config.PATH.prod + '/dll'))
    // cp.sync(config.PATH.dllProd, utils.p(config.PATH.prod + '/dll'))

    // @deprecated: 复制 extra和minify 逻辑放到 plugins/copy 中
    // utils.ensurePath(utils.p(config.PATH.prod + '/extra'))
    // cp.sync(config.PATH.extraFrontendAsset, utils.p(config.PATH.prod + '/extra'))

    // utils.log([
    //   'debug: webpack entry config = ',
    //   util.inspect(webpackConfig, {depth: null})
    // ])

    // 构建
    var compiler = webpack(webpackConfig)
    compiler.run(function (ex, stats) {
      if (ex) {
        utils.log(['error: 遇到构建错误.', ex, ex.stack])
        return
      }

      fs.writeFileSync(config.PATH.tmp + '/prod-build.txt', stats)
      if (opts.enableProfiling) {
        fs.writeFileSync(
          config.PATH.tmp + '/prod-profile.txt',
          stats.toString()
        )
      }

      opts.onBuilt && opts.onBuilt()

      utils.log(['info: 构建完成!'])
    })
  }
}
