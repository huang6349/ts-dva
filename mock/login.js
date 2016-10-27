'use strict';

const mockjs = require('mockjs');
const qs = require('qs');
const _ = require('underscore');

module.exports = {

  'GET /api/test/login': function (req, res) {
    const data = qs.parse(req.query);
    setTimeout(function () {
      if (data && data.account == 'admin' && data.password == '123456') {
        res.json({
          errno: 0,
          errmsg: '登录成功！',
          data: 1
        });
      } else {
        res.json({
          errno: 1000,
          errmsg: '帐号或密码错误！',
          data: 401
        });
      }
    }, 1000);
  }
};
