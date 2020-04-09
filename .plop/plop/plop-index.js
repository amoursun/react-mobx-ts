const plopUtils = require('./plop-utils');
const npath = require('path');

module.exports = function (plop) {
    plopUtils.loadGenerators(
        npath.resolve(__dirname, 'plop-templates'),
        plop,
    );
};
