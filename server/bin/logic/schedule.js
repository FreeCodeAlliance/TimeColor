// 定时管理
var schedule = require("node-schedule");
var lottery = require("./lottery/lottery");
var bet = require('./lottery/bet');

var scheduleMgr = module.exports;

// 启动开奖的定时任务
scheduleMgr.lottery = ()=> {
    var handleMin = (jobs, hour, min) => {
        if(min >= 60) {
            hour += 1;
            min -= 60;
        }
        var keyhour = hour;
        if(hour == 24) {
            keyhour = 0;
        }
        if(jobs[keyhour] == undefined) {
            jobs[keyhour] = [];
        }
        jobs[keyhour].push(min);
        return [hour, min];
    };

    var addScheduleJobs = (jobs, callback) => {
        for(var key in jobs) {
            var rule = new schedule.RecurrenceRule();
            rule.hour = key;
            rule.minute = jobs[key];
            schedule.scheduleJob(rule, ()=>{
                callback();
            });
        }
    };

    var lotteryJobs = {};
    var lockJobs = {};
    var stopJobs = {};
    tc.lotteryTimes.forEach((interval)=>{
        var curH = interval[0];
        var curM = tc.lotteryMin;
        while (true) {
            var resA = handleMin(lotteryJobs, curH, curM + tc.lotteryInterval);
            curH = resA[0];
            curM = resA[1];
            handleMin(lockJobs, curH, curM + tc.lotteryInterval - tc.lotteryLock);

            if(curH + curM / 60 == interval[1] + tc.lotteryMin / 60) {
                handleMin(stopJobs, curH, curM);
                break;
            }
        }
    });

    // console.log(lotteryJobs);
    // console.log(lockJobs);
    // console.log(stopJobs);

    // 开奖定时触发
    addScheduleJobs(lotteryJobs, () => {
        bet.settle();           // 下注结算
        lottery.execute();
    });

    // 锁定定时触发
    addScheduleJobs(lockJobs, () => {
        lottery.lock();
    });

    // 停止定时触发
    addScheduleJobs(stopJobs, () => {
        lottery.stop();
    });
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

// 启动定时器
scheduleMgr.start = ()=> {
    scheduleMgr.refreshLotteryNo();
    scheduleMgr.lottery();
};