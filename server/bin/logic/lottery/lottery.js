var util = require('util');
var lotterySql = require('../sql/lotterySql');

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
    // 记录开奖的时间
    this.lotteryDate = new Date();
    this.ctor();
    console.log(this.count, this.noStr, this.state);
};

// 初始化
Lottery.prototype.ctor = function() {
    var self = this;
    var date = this.refreshLotteryNo();
    var hour = date.getHours();
    var min = date.getMinutes();
    var day = date.getDay();
    var compareDay = day;
    if(hour + min < tc.lotteryTimes[0][0] + tc.lotteryMin) {
        var preDate = new Date(date.getTime() - 24 * 60 * 60 * 1000);
        self.refreshLotteryNo(preDate);
        compareDay -= 1;
    }
    var sumMins = 0;
    var isInterval = false;
    tc.lotteryTimes.forEach(function(interval){
        if(day > compareDay) {
            sumMins += (interval[1] - interval[0]) * 60;
        } else {
            if(hour * 60 + min >= interval[0] * 60 + tc.lotteryMin){
                if(hour <= interval[1]){
                    sumMins += hour * 60 + min - interval[0] * 60 - tc.lotteryMin;
                    isInterval = true;
                } else {
                    sumMins += (interval[1] - interval[0]) * 60;
                }
            }
        }
    });
    var count = sumMins / tc.lotteryInterval;
    this.count = Math.ceil(count);
    if(isInterval) {
        var rTime = (this.count - count) * tc.lotteryInterval;
        if(rTime <= tc.lotteryLock) {
            self.state = tc.lotteryState.lock;
        } else {
            self.state = tc.lotteryState.bet;
        }
        this.lotteryDate = new Date(date.getTime() - rTime * 60 * 1000);
    } else {
        self.state = tc.lotteryState.stop;
    }
    self.queryResult((issue, res)=>{});
};

// 刷新开奖期号
Lottery.prototype.refreshLotteryNo = function(date){
    // 计算开奖期号
    date = date ? date : new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    this.noStr = util.format("%d%s%s", year, tc.gf.prefixInteger(month), tc.gf.prefixInteger(day));
    return date;

    // var curHour = date.getHours();
    // var hours = 0;
    // var isInterval = false;
    // tc.lotteryTimes.forEach(function(interval){
    //     if(curHour >= interval[0]){
    //         if(curHour <= interval[1]){
    //             hours += curHour - interval[0];
    //             isInterval = true;
    //         } else {
    //             hours += interval[1] - interval[0];
    //         }
    //     }
    // });
    // var oneHour = Math.floor(60 / tc.lotteryInterval);
    // this.count = hours * oneHour;
    // if (isInterval) {
    //     var curMin = date.getMinutes() - tc.lotteryMin;
    //     this.count -= oneHour;
    //     this.count += Math.floor(curMin / tc.lotteryInterval);
    //     if(curMin >= 60 - 60 % tc.lotteryInterval) {
    //         return null;
    //     } else {
    //         this.count += 1;
    //         return curMin % tc.lotteryInterval;
    //     }
    // }
    // return null;
};

// 开奖
Lottery.prototype.execute = function() {
    this.state = tc.lotteryState.bet;
    this.count += 1;
    this.lotteryDate = new Date();
    var res = this.randomRes();
    // 暂时保存开奖记录
    var lotteryNoStr = util.format("%s%s", this.noStr, tc.gf.prefixInteger(this.count, 3));
    console.log(lotteryNoStr);
    this.lotteryRes[lotteryNoStr] = res;
    this.lotteryRes[util.format("%s%s", this.noStr, tc.gf.prefixInteger(this.count - 3, 3))] = null;
    // 保存到数据库
    lotterySql.insertLotteryResult(lotteryNoStr, res);
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

Lottery.prototype.stop = function() {
    this.state = tc.lotteryState.stop;
};

// 获取当前的开奖期号
Lottery.prototype.getNO = function() {
    return util.format("%s%s", this.noStr, tc.gf.prefixInteger(this.count, 3));
};

// 查询开奖结果
Lottery.prototype.queryResult = function(callback) {
    var self = this;
    var issue = self.getNO();
    var result = self.lotteryRes[issue];
    if (result) {
        callback(issue, result);
        return ;
    }
    lotterySql.getLotteryResult(issue, (err, row) => {
        if(!err && row) {
            result = tc.gf.stringToIntArray(row.result);
            self.lotteryRes[issue] = result;
            callback(issue, result);
        }
    });
};

// 获取开奖的剩余时间
Lottery.prototype.getReTime = function() {
    if (this.state === tc.lotteryState.stop) {
        return null;
    }

    var date = new Date();
    return math.ceil(parseInt(date - this.lotteryDate) / 1000);
};

///////////////////////////////////////////////////////////////////////////
// 获取开奖状态
Lottery.prototype.getLotteryState = function(req, res) {
    var rTime = this.getReTime();
    if (rTime == null) {
        tc.gf.send(res, null, {state:this.state, no:this.getNO()});
    } else {
        tc.gf.send(res, null, {time:rTime, state:this.state, no:this.getNO()});
    }
};

// 获取开奖结果
Lottery.prototype.getLotteryRes = function(req, res){
    var issue = req.query.no;
    if(issue == undefined) {
        issue = this.getNO();
    }
    var result = this.lotteryRes[issue];
    if (result) {
        tc.gf.send(res, null, result);
    } else {
        lotterySql.getLotteryResult(issue, (err, row) => {
            if(err) {
                tc.gf.send(res, tc.errorCode.query_fail);
            } else {
                if(row){
                    tc.gf.send(res, null, tc.gf.stringToIntArray(row.result));
                } else {
                    tc.gf.send(res, tc.errorCode.lottery_none);
                }
            }
        });
    }
};

module.exports = new Lottery();
