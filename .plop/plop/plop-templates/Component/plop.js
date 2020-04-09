const npath = require('path');
const _ = require('lodash');

module.exports = function (plop, data, utils) {
  function prompts(inquirer) {
    return inquirer
      .prompt([
        {
          type: 'input',
          name: 'compName',
          message: '组件名称是什么?'
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
        const compClass = _.upperFirst(_.camelCase(inputs.compName));
        inputs.compClass = compClass;
        inputs.compCSSWrapper = _.kebabCase(inputs.compName) + '-wrapper';
        inputs.compReactClass = _.upperFirst(_.camelCase(inputs.compName)) + 'Comp';
        inputs.compStateClass = _.upperFirst(_.camelCase(inputs.compName)) + 'State';

        return inputs;
      });
  }

  /**
   * @def template.component-vm
   *  raw:
   *      compName
   *      shouldInjectApp yes | no
   *      shouldUseReaction: yes | no
   *  derived:
   *      compClass
   *      compCSSWrapper
   *      compReactClass
   *      compStateClass
   */
  plop.setGenerator('component', {
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
          path: compPath + '/style.min.less',
          template: utils.template(__dirname, 'style.min.less')
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
