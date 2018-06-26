// 定时管理
var schedule = require("node-schedule");
var lottery = require("./lottery/lottery");

var scheduleMgr = module.exports;

var lotterySchedule = null;     // 开奖的定时器
// 启动开奖的定时任务
scheduleMgr.lottery = ()=> {
    var rule = new schedule.RecurrenceRule();

    // 生成开奖的范围时间
    var hours = [];
    tc.lotteryTimes.forEach((interval)=>{
        for(var i = interval[0]; i < interval[1]; i++) {
            hours.push(i);
        }
    });
    rule.hour = hours;

    // 分钟间隔时间
    var minutes = [];
    var interval =  tc.lotteryInterval / 2;
    var minCount = Math.floor(60 / interval);
    for(var i=0; i<= minCount; i++) {
        minutes.push(i * interval);
    }
    rule.minute = minutes;

    var curMinute = null;
    lotterySchedule = schedule.scheduleJob(rule, ()=>{
        if(curMinute == null) {
            var date = new Date();
            curMinute = date.getMinutes();
            curMinute = curMinute - curMinute % interval;
        } else {
            curMinute = curMinute + interval;
        }
        if(curMinute >= 60) {
            curMinute = curMinute - 60
        }
        lottery.schedule(curMinute);
    });
};

// 启动定时器
scheduleMgr.start = ()=> {
    scheduleMgr.lottery();
};