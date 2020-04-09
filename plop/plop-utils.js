const fs = require('fs');
const npath = require('path');
const moment = require('moment');
const _ = require('lodash');

const globalConfig = {};

const plopUtils = {
  preset: {
    yesNoChoices: ['yes', 'no'],
  },

  template(dirname, fileName) {
    const content = fs
      .readFileSync(
        npath.resolve(dirname, fileName)
      )
      .toString();

    return content
      .replace(/\/\* *skip *\*\/[^]+?\/\* *skip *\*\//g, '') // 移除 skip 包含区域
      .replace(/\/\* *(\{\{[^]+?\}\};?) *\*\//g, '$1') // 最终替换为匹配值
  },

  validators: {
    required(keyName) {
      return function (input) {
        const done = this.async();

        if (!_.trim(input)) {
          done(`${keyName} 不能为空`);
        }
        else {
          done(null, true);
        }
      }
    }
  },

  setGlobalConfig(config) {
    Object.assign(globalConfig, config);
  },

  fileGenerators(path, plop) {
    const currentPath = npath.resolve('.');
    const extraData = {
      currentPath,
      today: moment().format('YYYY-MM-DD'),
      ...globalConfig
    };

    if (!extraData.userName) {
      throw new Error(`请配置用户名(一般为 $PROJECT/plop/plop.config.js) userName`);
    }

    // 生成组件
    const files = fs.readdirSync(path); // 读取路径文件
    files.forEach(file => {
      const generatorPlopFile = npath.resolve(path, file, 'plop.js');
      if (fs.existsSync(generatorPlopFile)) {
        try {
          require(generatorPlopFile)(plop, extraData, plopUtils);
        }
        catch (ex) {
          console.error('遇到错误', ex);
          console.error('路径为 : ', generatorPlopFile);
        }
      }
    })
  }
};

module.exports = plopUtils;
