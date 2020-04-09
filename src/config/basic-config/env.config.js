/**
 * 系统变量配置
 */
var env = getEnv('NODE_ENV', 'dev');
var dev = /dev/i.test(env);
var https = getEnv('HTTPS', false);
var host = process.env.HOST ? getIpAddress() : 'localhost';
var port = parseInt(getEnv('PORT', 8088));
var prodPort = parseInt(getEnv('PRODPORT', 8118));

var npath = require('path');
var _ = require('lodash');
let moment = require('moment');
var utils = require('./utils');

let service_ip;
if (env.toLowerCase().indexOf('dev') > -1) {
    service_ip = 'localhost';
} else if (env.toLowerCase().indexOf('pro') > -1) {
    service_ip = 'localhost';
}

var config = {
    VERSION: require('../../../package').version,
    PROTOCOL: https ? 'https' : 'http',
    HTTPS: https,
    HOST: host,
    PORT: port,
    PRODPORT: prodPort,
    BASENAME: '', // BrowserRouter 的 basename
    SERVICE_IP: service_ip,
    ENV: env,
    DEV: dev,
    ROUTER: 'BrowserRouter', // react-router 采用的路由
    TARGET: getEnv('TARGET', 'dev'),
    HOT: getEnv('HOT', dev),
    INLINE: getEnv('INLINE', dev),
    PATH: {},
    ROOT: npath.join(__dirname, '../../..')
};

config.CLIENT = `${config.PROTOCOL}://${config.HOST}:${config.PORT}/`;

// 源代码类路径
config.PATH.root = config.ROOT;
config.PATH.static = utils.p(config.ROOT + '/static/');
config.PATH.src = utils.p(config.ROOT + '/src/');
config.PATH.frontend = utils.p(config.PATH.src + '/frontend/');
config.PATH.config = utils.p(config.PATH.src + '/config/');
config.PATH.projectNodeModules = utils.p(config.ROOT + '/node_modules');
config.PATH.frontendNodeModules = utils.p(config.PATH.frontend + '/node_modules');
config.PATH.extraFrontend = utils.p(config.PATH.frontend + '/extra/');

config.PATH.dest = utils.p(config.ROOT + '/dest/');

// 构建编译webpackConfig路径
config.PATH.basicConfig = utils.p(config.PATH.config + '/basic-config/');
config.PATH.buildConfig = utils.p(config.PATH.config + '/build-config/');
config.PATH.dllConfig = utils.p(config.PATH.config + '/dll-config/');
config.PATH.templates = utils.p(config.PATH.config + '/templates/');
config.PATH.webpackConfig = utils.p(config.PATH.config + '/webpack-config/');

config.PATH.devEntries = utils.p(config.PATH.dest + '/dev-entries/');
config.PATH.prodEntries = utils.p(config.PATH.dest + '/prod-entries/');

// 构建输出路径
config.PATH.dllDev = utils.p(config.PATH.dest + '/dll-dev/');
config.PATH.dllProd = utils.p(config.PATH.dest + '/dll-prod/');
config.PATH.dev = utils.p(config.PATH.dest + '/dev/');
config.PATH.prod = utils.p(config.PATH.dest + '/prod/');
config.PATH.prodPages = utils.p(config.PATH.prod + '/pages/');
config.PATH.prodDll = utils.p(config.PATH.prod + '/dll/');
config.PATH.prodDist = utils.p(config.PATH.prod + '/dist/');
config.PATH.prodExtra = utils.p(config.PATH.prod + '/extra/');

// webpack 构建的 entry 注册表
config.entries = require('../webpack-config/entries.config')(config);

// 发布脚本配置位置
config.PATH.buildPlans = utils.p(config.PATH.webpackConfig + '/build-plans/');

// 功能性路径
config.PATH.tmp = utils.p(config.PATH.root + '/tmp/');
config.PATH.doc = utils.p(config.PATH.root + '/doc/');

// backend 服务器
config.PATH.nodemonServer = utils.p(config.PATH.config + '/nodemon-server/');

// 开发环境所用的一些常数
config.CONST = {
  // 用于提供给未打开的 entry 作为其内容使用
  TEMPLATE_NO_ENTRY: '/*DON\'T MODIFY THIS LINE*/document.body.innerHTML = "<h1>该模块尚未打开, 请到 <a href=\'/\'>管理面板 </a>里打开该入口.</h1>"',

  // 指定哪些路径下的资源会被解析为 mobile 端的资源
  MOBILE_CODE_PATH_LIST: [
    npath.resolve(config.PATH.src, 'module/Mobile')
  ],

  BUILD_TIME: moment().format('YYYYMMDDHHmm'),
  CONTEXT: '',
  I18N_VERSION: '',

  ENTRY_PREFIX: {
    MOBILE: 'mobile-',
    PC: 'pc-',
  },

  ENTRY_TYPE: {
    // default
    PC_NORMAL: 'pc-normal',
  }
};

// 确保所有文件夹都已经创建
for (var pathName in config.PATH) {
  utils.ensurePath(config.PATH[pathName]);
}

// outputConf(config); // 先注释,打印环境变量

module.exports = config;

function getEnv(key, defaultValue) {
    return process.env[key.toUpperCase()] || process.env[key.toLowerCase()] || defaultValue;
}

function outputConf(conf) {
    const KEYS = Object.keys(conf);
    const MAX_LENGTH = Math.max(...KEYS.map(k => k.length)) + 2;

    console.log('\r\n\x1b[36m==================== 环境变量 ======================\x1b[0m');
    Object.keys(conf).forEach(k => {
        const color = conf[k] === true ? '\x1b[35m' : '';
    const len = k.length;
    const prefix = len < MAX_LENGTH ? ' '.repeat(MAX_LENGTH - k.length) : '';
    console.log('%s%s: %j\x1b[0m', color, prefix + k, conf[k]);
});
    console.log('\x1b[36m===================================================\x1b[0m\r\n');
}

function getIpAddress() {
    const interfaces = require('os').networkInterfaces();
    for (const devName in interfaces) {
        const iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            const alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}
