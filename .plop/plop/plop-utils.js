const fs = require('fs');
const npath = require('path');
const moment = require('moment');
const _ = require('lodash');

const globalConfig = {};
let hasExtraDataPrinted = false;

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
      .replace(/\/\* *skip *\*\/[^]+?\/\* *skip *\*\//g, '')
      .replace(/\/\* *plop/g, '')
      .replace(/plop *\*\//g, '')
      .replace(/\/\* *(\{\{[^]+?\}\};?) *\*\//g, '$1')
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

  ensureLocalFileFromExample(path, examplePath) {
    examplePath = examplePath || path + '.example'

    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, fs.readFileSync(examplePath));
    }
  },

  setGlobal(incomingGlobalConfig) {
    console.log(incomingGlobalConfig)
    Object.assign(globalConfig, incomingGlobalConfig);
  },

  /**
   * 本方法需要在 setGlobal 之后才能调用
   *
   * @def: path, plop => undefined
   *  ///
   *  generators 的文件夹所在,
   *  利用其位置, 得到一系列 generator 的文件夹,
   *  使用其内部 plop.js 进行初始化, plop.js 的规则与 plopfile.js 一致
   *  ///
   *  path: string
   *
   *  plop: #@plopInstance
   */
  loadGenerators(path, plop) {
    const currentPath = npath.resolve('.');
    const extraData = {
      currentPath,
      today: moment().format('YYYY-MM-DD'),
      ...basicGlobalConfig,    // @deprecated global config 跟项目走，plop-utils 只提供 plop 基础工具
      ...globalConfig
    };

    if (!hasExtraDataPrinted) {
      console.log('\n模板系统使用的额外数据项 preset & global config (请检查是否正确) :');
      console.log(JSON.stringify(extraData, null, 4), '\n');
      hasExtraDataPrinted = true;
    }

    if (extraData.userName === 'SET_YOUR_USERNAME') {
      throw new Error(`请通过 globalConfig 参数 (一般为 $PROJECT/.plop/plop.config.js) 或 ${basicGlobalConfigPath} 配置你的 userName`);
    }

    const files = fs.readdirSync(path);

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

// @deprecated global config 跟项目走，plop-utils 只提供 plop 基础工具
const basicGlobalConfigPath = npath.resolve(__dirname, './plop.config.js');
plopUtils.ensureLocalFileFromExample(
  basicGlobalConfigPath
);

const basicGlobalConfig = require(basicGlobalConfigPath);

module.exports = plopUtils;
