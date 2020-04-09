var _ = require('lodash')
var express = require('express')
var serverStarter = require('../server/server-dev')
var config = require('../basic-config/env.config')
var util = require('util')
var fs = require('fs')
var getWebpackConfig = require('../webpack-config/webpack.config.base')
var utils = require('../basic-config/utils')

var bodyParser = require('body-parser')

let TEMPLATE_NO_ENTRY = require('../webpack-config/common/server-consts').TEMPLATE_NO_ENTRY

var compiled = _.template(
  fs.readFileSync(utils.p(__dirname + '/entry.template.js')).toString()
)
var getEntryContent = function (entry) {
  return compiled({entry: entry})
}

var serverUtils = {
  wrapResponse: function (data, status) {
    status = status || 'success'

    return {
      status,
      data
    }
  },

  toggleEntries: function (entries) {
    var hash = {}

    for (var pageName in config.entries) {
      var pageConfig = config.entries[pageName]

      hash[pageName] = pageConfig
    }

    entries.forEach(function (entry) {
      if (entry.disabled) {
        return
      }
      var entryConfig = hash[entry.id]

      if (entryConfig.turnedOn !== entry.checked) {
        var pageEntryPath = utils.p(
          config.PATH.devEntries + '/' + entry.id + '.js'
        )

        // console.log('@debug, toggle entry = ', entryConfig, pageEntryPath, getEntryContent(entryConfig.entry))
        if (entry.checked) {
          fs.writeFileSync(
            pageEntryPath,
            getEntryContent(entryConfig.entry)
          )
        } else {
          fs.writeFileSync(pageEntryPath, '')
        }
        entryConfig.turnedOn = entry.checked
      }
    })
  }
}

function getEntry() {
  var reactHotLoaderPatch = 'react-hot-loader/patch'


  var webpackEntries = {}

  for (var pageName in config.entries) {

    var pageConfig = config.entries[pageName]

    var pageEntryPath = utils.p(
      config.PATH.devEntries + '/' + pageName + '.js'
    );

    if (pageConfig.openOnDefault) {
      fs.writeFileSync(pageEntryPath, getEntryContent(pageConfig.entry))
      pageConfig.turnedOn = true
    } else if (!fs.existsSync(pageEntryPath)) {
      fs.writeFileSync(pageEntryPath, TEMPLATE_NO_ENTRY)
      pageConfig.turnedOn = false
    } else {
      var currentContent = fs.readFileSync(pageEntryPath).toString()
      if (
        currentContent !== TEMPLATE_NO_ENTRY &&
        currentContent !== getEntryContent(pageConfig.entry)
      ) {
        fs.writeFileSync(
          pageEntryPath,
          getEntryContent(pageConfig.entry)
        )
        pageConfig.turnedOn = true
      } else if (currentContent === TEMPLATE_NO_ENTRY) {
        pageConfig.turnedOn = false
      } else {
        pageConfig.turnedOn = true
      }
    }

    // console.log('@debug conifg = ', pageConfig)
    webpackEntries[pageName] = [
      'babel-polyfill',
      reactHotLoaderPatch,
      // https://github.com/glenjamin/webpack-hot-middleware#multi-compiler-mode
      'webpack-hot-middleware/client?reload=true&noInfo=false&name=' +
      pageName,
      pageEntryPath
    ]
  }

  return webpackEntries
}

module.exports = function (options) {
  options = options || {}

  serverStarter({
    port: config.PORT,
    logLevel: options.logLevel,
    lifeCycle: {
      getWebpackConfig: function () {

        var entry = getEntry()
        // console.log('config.entries', entry)
        var webpackConfig = Object.keys(entry).map(function (entryName) {
          var eachOptions = entry[entryName].options || {}
          var options = _.extend({}, eachOptions, {
            dev: true,
            entryName: entryName,
            template: entry[entryName] && entry[entryName].dev,
            type: entry[entryName].type
          })
          var config = getWebpackConfig(options)
          config.entry = {[entryName]: entry[entryName]}
          return config
        })

        options.logLevel === 'debug' &&
        console.log(
          '@debug, webpack config ',
          util.inspect(webpackConfig, {depth: null})
        )
        return webpackConfig
      },

      /**
       * 加载特殊的 开发服务器的 逻辑处理
       */
      loadDevServerLogic: function (app, context) {
        app.all('/', function (req, res) {
          res.redirect('/pages/open-page.html')
        })
        app.use('*', function (req, res, next) {
          next()
          // console.log('req', req.headers)
          // console.log('res', res.headers)
        })

        app.use('/_/entries_module/*', bodyParser.json())

        app.all('/_/entries_module/api/all-entries', function (req, res) {
          res.send(serverUtils.wrapResponse(config.entries))
        })

        app.all('/_/entries_module/api/toggle-entries', function (req, res) {
          // console.log('@debug, entries = ', req.body)
          serverUtils.toggleEntries(req.body.entries)
          res.send(serverUtils.wrapResponse())
        })

        app.all('/_/entries_module/api/toggle-entry', function (req, res) {
          var pageConfigObject = req.body.pageConfigObject
          if (pageConfigObject) {
            _.each(pageConfigObject, function (pageConfig,
                                               pageName) {
              if (config.entries[pageName]) {
                var pageEntryPath = utils.p(
                  config.PATH.devEntries +
                  '/' +
                  pageName +
                  '.js'
                )

                if (pageConfig.turnOn) {
                  fs.writeFileSync(
                    pageEntryPath,
                    getEntryContent(pageConfig.entry)
                  )
                } else {
                  fs.writeFileSync(
                    pageEntryPath,
                    TEMPLATE_NO_ENTRY
                  )
                }
              } else {
                utils.logs([
                  'error: 入口模块未找到 ' + pageName
                ])
              }
            })
          }
        })

        // special backend
        require('../nodemon-server/nodemon')

        // AddAssetHtmlPlugin work for this
        // app.use('/dll', express.static(config.PATH.dllDev))

        app.use(
          '/extra',
          express.static(config.PATH.extraFrontend)
        )
      }
    }
  })
}
