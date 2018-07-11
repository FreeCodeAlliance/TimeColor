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
};

// 初始化
Lottery.prototype.ctor = function(lotteryJobs) {
    var self = this;
    var date = self.refreshLotteryNo();
    var hour = date.getHours();
    var min = date.getMinutes();
    var day = date.getDate();
    var year = date.getFullYear();
    var month = date.getMonth();

    function refreshDate(time) {
        var newDate = new Date(date.getTime() - time);
        day = newDate.getDay();
        year = newDate.getFullYear();
        month = newDate.getMonth();
        return newDate;
    }

    function calcCount(curHour) {
        for (var i=0; i < curHour; i++) {
            if (lotteryJobs[i]) {
                self.count += lotteryJobs[i].length;
            }
        }
    }

    var sortF = (x, y) => {
        if (x < y) {
            return -1;
        } else if (x > y) {
            return 1;
        } else {
            return 0;
        }
    };

    calcCount(hour);
    var jobs = lotteryJobs[hour];
    if(jobs == undefined || (jobs && min < jobs[0])) {
        hour -= 1;
        if (hour < 0) {
            hour = 23;
            self.refreshLotteryNo(refreshDate(24 * 60 * 60 * 1000));
            calcCount(hour);
        }
        jobs = lotteryJobs[hour];
        if(jobs == undefined) {
            self.state = tc.lotteryState.stop;
        } else {
            jobs.sort(sortF);

            var maxMin = jobs[jobs.length - 1];
            min += 60;
            if(maxMin + tc.lotteryInterval <= min) {
                self.state = tc.lotteryState.stop;
            } else {
                if(min - maxMin >= tc.lotteryInterval - tc.lotteryLock) {
                    self.state = tc.lotteryState.lock;
                } else {
                    self.state = tc.lotteryState.bet;
                }
                self.lotteryDate = new Date(year, month, day, hour, maxMin, 0, 0);
            }
        }
    } else {
        jobs.sort(sortF);

        var len = jobs.length;
        if(min < jobs[len - 1] + tc.lotteryInterval) {
            for(var i = 1; i <= len; i++) {
                self.count += 1;
                if ((jobs && min < jobs[i]) || i == len) {
                    self.lotteryDate = new Date(year, month, day, hour, jobs[i - 1], 0, 0);
                    if(min - jobs[i] >= tc.lotteryInterval - tc.lotteryLock) {
                        self.state = tc.lotteryState.lock;
                    } else {
                        self.state = tc.lotteryState.bet;
                    }
                    break;
                }
            }
        } else {
            self.state = tc.lotteryState.stop;
            self.count += len;
        }
    }

    console.log(self.count, self.noStr, self.state, tc.gf.getCurTimeFormat(self.lotteryDate));
    self.queryResult((iss, res) => {
        console.log('queryResult complete!');
    });
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
    return Math.ceil(tc.lotteryInterval * 60 - parseInt(date - this.lotteryDate) / 1000);
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

    // 用户不能提前知道开奖结果
    var type = req.payload.type;
    if(type == 'users' && issue == this.getNO()) {
        tc.gf.send(res, tc.errorCode.lottery_none);
        return ;
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

// 获取今日开奖结果
Lottery.prototype.getTodayRes = function(req, res) {
    var self = this;
    lotterySql.getTodayResult(self.getNO(), (err, rows) => {
        if(err) {
            tc.gf.send(res, tc.errorCode.query_fail);
        } else {
            var array = [];
            for(var i in rows) {
                var row = rows[i];
                array.push({no:row.issue, res:tc.gf.stringToIntArray(row.result)});
            }
            tc.gf.send(res, null, array);
        }
    });
};

// 获取开奖记录
Lottery.prototype.getLotteryLog = function(req, res) {
    var self = this;
    var uid = req.payload && req.payload.userid || req.query.uid;
    var day = req.query.day || 3;

    var date = new Date();
    var dayDate = new Date(date.getTime() - day * 24 * 3600 * 1000);
    var minIssue = util.format("%d%s%s000", dayDate.getFullYear(), tc.gf.prefixInteger(dayDate.getMonth() + 1), tc.gf.prefixInteger(dayDate.getDate()));
    var maxIssue = self.getNO();
    lotterySql.getlotterylog(uid, minIssue, maxIssue, (err, rows) => {
        if (err) {
            tc.gf.send(res, tc.errorCode.query_fail);
        } else {
            for(var i in rows) {
                var row = rows[i];
                row.result = tc.gf.stringToIntArray(row.result);
            }
            tc.gf.send(res, null, rows);
        }
    });
};

module.exports = new Lottery();
