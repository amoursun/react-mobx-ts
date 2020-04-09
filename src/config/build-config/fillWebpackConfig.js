
var _ = require('lodash')
var config = require('../basic-config/env.config')
var utils = require('../basic-config/utils')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin
var getWebpackConfig = require('../webpack-config/webpack.config.base')

module.exports = function (buildPlanConfig, options) {
    var dev = options.dev
    var sourceMap = options.sourceMap
    var enableProfile = options.enableProfile
    var presets = options.presets || []

    var webpackConfig = []
    var entries = {}
    _.each(buildPlanConfig, function (template, entryKey) {
        var entryConfig = config.entries[entryKey]
        var entryScriptPath = entryConfig.entry
        entries[entryKey] = presets.concat(entryScriptPath)
        var eachConfig = getWebpackConfig({
            dev: dev,
            template: entryConfig.template && entryConfig.template[dev ? 'dev' : 'prod'],
            type: entryConfig.type,
            entryName: entryKey,
            data: entryConfig.data
        })
        eachConfig.devtool = sourceMap ? 'source-map' : false
        eachConfig.entry = {[entryKey]: entries[entryKey]}

        if (enableProfile) {
            // eachConfig.profile = true
            eachConfig.plugins.push(
                new BundleAnalyzerPlugin({
                    analyzerMode: !dev ? 'static' : 'server',
                    reportFilename: 'report_' + entryKey + '.html'
                })
            )
        }
        webpackConfig.push(eachConfig)
    })

    return webpackConfig
}
