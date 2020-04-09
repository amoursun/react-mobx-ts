var utils = require('../basic-config/utils');
var _ = require('lodash');

module.exports = function (config) {

  var templates = {
    dev: {
      default: utils.p(config.PATH.templates + '/dev-page.html'),
    },
    prod: {
      default: utils.p(config.PATH.templates + '/prod-page.html'),
    },
  };

  var templateConfig = {
    dev: templates.dev.default,
    prod: templates.prod.default,
  };

  var entries = {};

  // 业务模块入口
  // 注意调整 alias
  _.merge(entries, {
    'home': {
      entry: 'frontend/index.js',
      template: templateConfig,
      // data: {
      // 一些额外的数据  可以在模板中获取到
      // }
    },
    'error': {
      entry: 'frontend/module/Error/index.js',
      template: templateConfig
    }
  });

  // develop modules entries
  _.merge(entries, {
    'open-page': {
      openOnDefault: true,
      entry: 'common/Page/PageEntryManagement',
      template: {
        dev: templates.dev.default,
      },
    },
  });

  return entries;
};

