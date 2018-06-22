var express = require('express');
var router = express.Router();
var register = require('../bin/logic/login/register');
var login = require('../bin/logic/login/login');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 注册
router.post('/register', (req, res) => {
    register.user(req, res);
});

// 登录
router.get('/login', (req, res) => {
    login.user(req, res);
});


////////////////////开奖相关接口

module.exports = router;
