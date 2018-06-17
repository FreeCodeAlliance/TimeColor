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
    //register.execute(req, res);
    register.testExecute(req, res);
});

// 注册审核
router.get('/registerCheck', (req, res) => {
    register.registerCheck(req, res);
});

// 获取注册审核列表
router.get('/checkList', (req, res) => {
    register.getlist(req, res);
});

// 登录
router.get('/login', (req, res) => {
    login.execute(req, res);
});

module.exports = router;
