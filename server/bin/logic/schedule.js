// 定时管理
var schedule = require("node-schedule");
var lottery = require("./lottery/lottery");
var bet = require('./lottery/bet');

var scheduleMgr = module.exports;

// 启动开奖的定时任务
scheduleMgr.lottery = ()=> {
    var rule = new schedule.RecurrenceRule();
    var lockrule = new schedule.RecurrenceRule();

    // 生成开奖的范围时间
    var hours = [];
    tc.lotteryTimes.forEach((interval)=>{
        for(var i = interval[0]; i < interval[1]; i++) {
            hours.push(i);
        }
    });
    rule.hour = hours;
    lockrule.hour = hours;

    // 分钟间隔时间
    var minutes = [];
    var lockminutes = [];
    var count = Math.floor(60 / tc.lotteryInterval);
    for(var i=0; i< count; i++) {
        var t = i * tc.lotteryInterval
        minutes.push(t);
        lockminutes.push(t + tc.lotteryInterval - tc.lotteryLock);
    }
    rule.minute = minutes;
    lockrule.minute = lockminutes;
    // 开奖定时触发
    schedule.scheduleJob(rule, ()=>{
        bet.settle(); // 下注结算
        lottery.execute();
    });
    // 锁定定时触发
    schedule.scheduleJob(lockrule, ()=>{
        lottery.lock();
    });
    // 停止定时触发
    if (60 % tc.lotteryInterval != 0) {
        var stoprule = new schedule.RecurrenceRule();
        stoprule.hour = hours;
        stoprule.minute = [60 - 60 % tc.lotteryInterval];
        schedule.scheduleJob(lockrule, ()=>{
            lottery.stop();
        });
    }
};

// 刷新开奖期号
scheduleMgr.refreshLotteryNo = ()=> {
    var rule = new schedule.RecurrenceRule();
    rule.hour = [0];
    schedule.scheduleJob(rule, ()=>{
        lottery.refreshLotteryNo();
        lottery.count = 0;
    });
};

// 刷新开奖停止响应
scheduleMgr.stopLottery = () => {
    var hours = [];
    for(var i = 0, len = tc.lotteryTimes.length; i < len; i++) {
        hours.push(tc.lotteryTimes[i][2]);
    }

    var rule = new schedule.RecurrenceRule();
    rule.hour = hours;
    schedule.scheduleJob(rule, () => {
        lottery.stop();
    });
};

// 启动定时器
scheduleMgr.start = ()=> {
    scheduleMgr.refreshLotteryNo();
    scheduleMgr.stopLottery();
    scheduleMgr.lottery();
};