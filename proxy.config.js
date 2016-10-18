'use strict';

const mock = {
  'GET /api/(.*)': 'http://127.0.0.1:8360/',
};

require('fs').readdirSync(require('path').join(__dirname + '/mock')).forEach(function (file) {
  Object.assign(mock, require('./mock/' + file));
});

module.exports = mock;
