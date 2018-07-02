var express = require('express');
var router = express.Router();
var user = require('../bin/logic/user');
var lottery = require('../bin/logic/lottery/lottery');

/* GET home page. */
router.get('/getInfo', (req, res, next) => {
    user.getInfo(req, res);
});

// 获取服务器的开奖配置信息
router.get('/lotteryConfig', (req, res) => {
    tc.gf.send(res, null, {interval:tc.lotteryInterval, lock:tc.lotteryLock, times:tc.lotteryTimes});
});

// 获取开奖状态
router.get('/lotteryState', (req, res) => {
    lottery.getLotteryState(req, res);
});

// 获取开奖结果
router.get('/lotteryRes', (req, res) => {
    lottery.getLotteryRes(req, res);
});

// 获取开奖赔率 先写死
router.get('/lotteryOdds', (req, res) => {
    tc.gf.send(res, null, tc.gf.initBetArray(2.2));
});

module.exports = router;
