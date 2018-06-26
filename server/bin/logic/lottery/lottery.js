var util = require('util');

// 开奖
function Lottery() {
    // 开奖状态
    this.lotteryState = tc.lotteryState.bet;

    // 开奖结果 一般保留三组数据
    this.lotteryRes = {};

    this.interval = tc.lotteryInterval * 0.5;

    // 当天开奖次数
    this.count = 0;
    this.noStr = "";
    this.refreshLotteryNo();
};

// 刷新开奖期号
Lottery.prototype.refreshLotteryNo = function(){
    // 计算开奖期号
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    this.noStr = util.format("%d%02d%02d", year, month, day);

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
    if (!isInterval) {
        var curMin = date.getMinutes();
        this.count -= hours;
        this.count += Math.ceil(curMin / tc.lotteryInterval);
    }
};

// 定时器响应
Lottery.prototype.schedule = function (minute) {
    var state = Math.floor(minute / this.interval) % 2;
    if (state === 0) {
        this.lotteryState = tc.lotteryState.bet;
        this.count += 1;
        // 随机开奖结果
        var res = this.randomRes();
        // 暂时保存开奖记录
        this.lotteryRes[util.format("%s%03d", this.noStr, this.count)] = res;
        this.lotteryRes[util.format("%s%03d", this.noStr, this.count - 3)] = null;
    } else {
        this.lotteryState = tc.lotteryState.lock;
    }
};

// 随机开奖结果
Lottery.prototype.randomRes = function () {
    var random = () => {
        return Math.floor(Math.random() * 10);
    };

    // 个 // 十 // 百 // 千 // 万
    return {
        i:random(),
        t:random(),
        h:random(),
        th:random(),
        tth:random(),
    }
};

module.exports = new Lottery();