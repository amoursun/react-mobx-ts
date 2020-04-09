const plopUtils = require('./plop-utils');
const npath = require('path');

module.exports = function (plop) {
  try {
    plopUtils.setGlobalConfig(require('./plop.config.js')); // fileGenerators 之前必须先运行setGlobalConfig
  }
  catch (ex) {
    console.error('请运行 cp plop/plop.config.example.js plop/plop.config.js, 并修改userName');
  }

  plopUtils.fileGenerators(
    npath.resolve(__dirname, 'plop-templates'),
    plop,
  );
};
