var CopyWebpackPlugin = require('copy-webpack-plugin')
var minify = require('minify')
var config = require('../../basic-config/env.config')
var nps = require('path')

var array = [
  {
    from: {
      glob: nps.join(config.PATH.extraFrontend, '**/*'), dot: false
    },
    // from: nps.join(config.PATH.frontend, 'extra'),
    // relative path
    context: config.PATH.extraFrontend,
    to: '../extra',
    toType: 'dir',
    // cache: true,
    /**
     *
     * @param body 文件内容
     * @param from 文件路径
     * @return {Promise<any>}
     */
    transform: function (body, from) {
      var ext = from.replace(/.+\.(.+?)$/, '$1') // 文件后缀名
      var isI18n = /\/i18n\//.test(from) && ext === 'js'
      return new Promise(function (resolve, reject) {
        var method = minify[ext]
        if (!method) {
          resolve(body)
          return
        }
        /**
         * 由于minify版本不同, 写法不同, 错误写法会阻断运行, 表现出 (TODO)构建会出问题, config.prod.server.js 的 compiler.run 未运行
         * */
        // 此方法为 minify@3 的用法写法, 版本不同写法不同
        method(body.toString(), function (error, data) {
            if (error) {
                reject(error)
                console.error(error)
                process.exit(1)
            }
            if (isI18n) {
                data = data + '\nlang || _lang;'
            }
            if (ext === 'js') {
                data = '/* eslint-disable */\n' + data
            }
            resolve(data)
        })
      })
    }
  }
]

module.exports = new CopyWebpackPlugin(array, {debug: null})
