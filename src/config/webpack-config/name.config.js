
//读取package.json里的依赖，normalize.css除外，打包会报错
const package = require('../../../package.json')

const confNames = {
    dependencies: Object.keys(package.dependencies) || []
};

module.exports = confNames;
