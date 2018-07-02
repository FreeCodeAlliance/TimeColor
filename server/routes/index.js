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
    var odds = [];
    for(var i=0, len = tc.BET_FIELDS.length; i < len; i++) {
        if (i >= 5 ) {
            odds.push(2.2);
        } else {
            var list = [];
            for(var j = 0; j < 9; j++) {
                list.push(2.2);
            }
            odds.push(list);
        }
    }
    tc.gf.send(res, null, odds);
});

module.exports = router;
