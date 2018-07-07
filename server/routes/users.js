var express = require('express');
var router = express.Router();
var register = require('../bin/logic/login/register');
var login = require('../bin/logic/login/login');
//var lottery = require('../bin/logic/lottery/lottery');
var bet = require('../bin/logic/lottery/bet');

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

// 获取下注的获利
router.get('/betgain', (req, res) => {
    bet.betGain(req, res);
});

// 下注
router.post('/bet', (req, res) => {
    bet.execute(req, res);
});

module.exports = router;
