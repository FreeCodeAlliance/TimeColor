var util = require('util');

// 开奖个数
var LOTTERY_COUNT = 5;

// 开奖
function Lottery() {
    // 开奖状态
    this.state = tc.lotteryState.stop;

    // 开奖结果 一般保留三组数据
    this.lotteryRes = {};

    // 当天开奖次数
    this.count = 0;
    this.noStr = "";
    this.ctor();
    console.log(this.count);
};

// 初始化
Lottery.prototype.ctor = function() {
    var rTime = this.refreshLotteryNo();
    if (rTime == null) {
        this.state = tc.lotteryState.stop;
    } else {
        if (rTime <= tc.lotteryInterval - tc.lotteryLock) {
            this.state = tc.lotteryState.bet;
        } else {
            this.state = tc.lotteryState.lock;
        }
    }
};

// 刷新开奖期号
Lottery.prototype.refreshLotteryNo = function(){
    // 计算开奖期号
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    this.noStr = util.format("%d%s%s", year, tc.gf.prefixInteger(month), tc.gf.prefixInteger(day));

    var curHour = date.getHours();
    var hours = 0;
    var isInterval = false;
    tc.lotteryTimes.forEach(function(interval){
        if(curHour >= interval[0]){
            if(curHour <= interval[1]){
                hours += curHour - interval[0];
                isInterval = true;
            } else {
                hours += interval[1] - interval[0];
            }
        }
    });
    var oneHour = Math.floor(60 / tc.lotteryInterval);
    this.count = hours * oneHour;
    if (isInterval) {
        var curMin = date.getMinutes();
        this.count -= oneHour;
        this.count += Math.floor(curMin / tc.lotteryInterval);
        if(curMin >= 60 - 60 % tc.lotteryInterval) {
            return null;
        } else {
            this.count += 1;
            return curMin % tc.lotteryInterval;
        }
    }
    return null;
};

// 开奖
Lottery.prototype.execute = function() {
    this.state = tc.lotteryState.bet;
    this.count += 1;
    var res = this.randomRes();
    // 暂时保存开奖记录
    var lotteryNoStr = util.format("%s%s", this.noStr, tc.gf.prefixInteger(this.count, 3));
    console.log(lotteryNoStr);
    this.lotteryRes[lotteryNoStr] = res;
    this.lotteryRes[util.format("%s%s", this.noStr, tc.gf.prefixInteger(this.count - 3, 3))] = null;
};

// 随机开奖结果
Lottery.prototype.randomRes = function () {
    var random = () => {
        return Math.floor(Math.random() * 10);
    };

    // 万 // 千 // 百 // 十 // 个
    var res = [];
    for(var i=0; i < LOTTERY_COUNT; ++i) {
        res.push(random());
    }
    return res;
};

// 锁定
Lottery.prototype.lock = function() {
    this.state = tc.lotteryState.lock;
};

// 获取当前的开奖期号
Lottery.prototype.getNO = function() {
    return util.format("%s%s", this.noStr, tc.gf.prefixInteger(this.count, 3));
};

// 获取开奖的剩余时间
Lottery.prototype.getReTime = function() {
    if (this.state === tc.lotteryState.stop) {
        return null;
    }

    var date = new Date();
    var curMin = date.getMinutes();
    return curMin % tc.lotteryInterval;
};

// 获取开奖状态
Lottery.prototype.getLotteryState = function(req, res) {
    var rTime = this.getReTime();
    if (rTime == null) {
        tc.gf.send(res, null, {state:this.state});
    } else {
        tc.gf.send(res, null, {time:rTime, state:this.state});
    }
};

module.exports = new Lottery();