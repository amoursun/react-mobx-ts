
var nodemon = require('nodemon')

var config = require('../basic-config/env.config')
var utils = require('../basic-config/utils')

nodemon({
    script: utils.p(config.PATH.nodemonServer + '/nodemon-index.js'),
    watch: [
        config.PATH.nodemonServer,
        config.PATH.webpackConfig,
    ]
})
