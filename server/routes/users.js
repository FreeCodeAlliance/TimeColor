var express = require('express');
var router = express.Router();
var register = require('../bin/logic/login/register');
var login = require('../bin/logic/login/login');
var lottery = require('../bin/logic/lottery/lottery');

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
// 获取服务器的开奖配置信息
router.get('/lotteryConfig', (req, res) => {
    tc.gf.send(res, null, {interval:tc.lotteryInterval, lock:tc.lotteryLock, times:tc.lotteryTimes});
});

// 获取开奖状态
router.get('/lotteryState', (req, res) => {
    lottery.getLotteryState(req, res);
});

module.exports = router;
