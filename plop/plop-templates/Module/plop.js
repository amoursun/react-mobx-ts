const npath = require('path');
const _ = require('lodash');

module.exports = function (plop, data, utils) {
  function prompts(inquirer) {
    return inquirer
      .prompt([
        {
          type: 'input',
          name: 'moduleName',
          message: '模块名称是什么?',
          validate(input) {
            const done = this.async();

            if (!_.trim(input)) {
              done('你需要输入非空的模块名称');
            }
            else {
              done(null, true);
            }
          }
        },
        {
          type: 'list',
          default: 'no',
          choices: ['yes', 'no'],
          name: 'useDemo',
          message: '是否需要引入 demo?'
        }
      ])
      .then(inputs => {
        const compClass = _.upperFirst(_.camelCase(inputs.moduleName));
        inputs.compClass = compClass;
        inputs.compCSSWrapper = _.kebabCase(inputs.moduleName) + '-module-wrapper';
        inputs.compReactClass = _.upperFirst(_.camelCase(inputs.moduleName)) + 'ModuleComp';
        inputs.compStateClass = _.upperFirst(_.camelCase(inputs.moduleName)) + 'ModuleState';

        return inputs;
      });
  }

  plop.setGenerator('module', {
    prompts,
    actions: function (inputs) {
      const compPath = '{{currentPath}}/{{compClass}}';

      let actions = [
        {
          type: 'add',
          data,
          path: compPath + '/State.js',
          template: utils.template(__dirname, 'State.js')
        },
        {
          type: 'add',
          data,
          path: compPath + '/style.use.less',
          template: utils.template(__dirname, 'style.use.less')
        },
        {
          type: 'add',
          data,
          path: compPath + '/index.js',
          template: utils.template(__dirname, 'index.js')
        }
      ];

      if (inputs.useDemo) {
        actions = actions.concat([]);
      }

      return actions;
    }
  });
};
