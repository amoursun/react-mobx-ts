
var express = require('express')

var config = require('../basic-config/env.config')
var utils = require('../basic-config/utils')

/**
 *
 * @type {{start: backendServer.start}}
 */
var configServer = {
    start: function(opts) {
        opts = opts || {}

        var app = opts.app || express()

        if (!opts.app) {
            app.listen(config.PRODPORT, function (err) {
                if (err) {
                    utils.log(['error: 启动后端服务器出现错误', err, err.stack])
                    return;
                }

                utils.log(['info: 后端服务器启动成功, http://localhost:' + config.PRODPORT]);
            });
        }
    }
}

module.exports = configServer;
