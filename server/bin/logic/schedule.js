// 定时管理
var schedule = require("node-schedule");
var lottery = require("./lottery/lottery");
var bet = require('./lottery/bet');

var scheduleMgr = module.exports;

// 启动开奖的定时任务
scheduleMgr.lottery = ()=> {



    // 生成开奖的范围时间
    var hours = [];
    tc.lotteryTimes.forEach((interval)=>{
        for(var i = interval[0]; i < interval[1]; i++) {
            hours.push(i);
        }
    });

    // 分钟间隔时间
    var minutes = [];
    var lockminutes = [];
    var count = Math.floor(60 / tc.lotteryInterval);
    var isAddHour = false;
    for(var i=0; i< count; i++) {
        var t = i * tc.lotteryInterval + tc.lotteryMin
        minutes.push(t);
        if (t + tc.lotteryInterval - tc.lotteryLock > 60) {
            lockminutes.push(t + tc.lotteryInterval - tc.lotteryLock - 60);
            isAddHour = true
        } else {
            lockminutes.push(t + tc.lotteryInterval - tc.lotteryLock);
        }
    }

    var lockhours =  [];
    if (isAddHour) {
        for(var i =0, len = hours.length; i < len; i++) {
            if (hours[i] + 1 == 24) {
                lockhours.push(0);
            } else {
                lockhours.push(hours[i] + 1);
            }
        }
        lockhours = Array.from(new Set(lockhours));
    }
    //console.log(hours, lockhours, minutes, lockminutes);

    var rule = new schedule.RecurrenceRule();
    rule.hour = hours;
    rule.minute = minutes;
    // 开奖定时触发
    schedule.scheduleJob(rule, ()=>{
        bet.settle(); // 下注结算
        lottery.execute();
    });

    var lockrule = new schedule.RecurrenceRule();
    lockrule.hour = lockhours;
    lockrule.minute = lockminutes;
    // 锁定定时触发
    schedule.scheduleJob(lockrule, ()=>{
        lottery.lock();
    });

    // 停止定时触发
    if (60 % tc.lotteryInterval != 0) {
        var stoprule = new schedule.RecurrenceRule();
        stoprule.hour = hours;

        stoprule.minute = [60 - 60 % tc.lotteryInterval + tc.lotteryMin];
        schedule.scheduleJob(lockrule, ()=>{
            lottery.stop();
        });
    }
};

// 刷新开奖期号
scheduleMgr.refreshLotteryNo = ()=> {
    var rule = new schedule.RecurrenceRule();
    rule.hour = [0];
    rule.minute = tc.lotteryMin;
    schedule.scheduleJob(rule, ()=>{
        lottery.refreshLotteryNo();
        lottery.count = 0;
    });
};

// 刷新开奖停止响应
scheduleMgr.stopLottery = () => {
    var hours = [];
    for(var i = 0, len = tc.lotteryTimes.length; i < len; i++) {
        if (tc.lotteryTimes[i][1] == 24) {
            hours.push(0);
        } else {
            hours.push(tc.lotteryTimes[i][1]);
        }
    }
    var rule = new schedule.RecurrenceRule();
    rule.hour = hours;
    rule.minute = tc.lotteryMin;
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