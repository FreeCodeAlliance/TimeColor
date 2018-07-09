// 下注
var lottery = require('./lottery');
var lotterySql = require('../sql/lotterySql');
var userSql = require('../sql/userSql');

function Bet() {
    // 当前下注数据
    this.bets = {};
    this.ctor();
    // 赔率
    this.odds = tc.gf.initBetArray(tc.NUMODDS);
    for(var i = tc.BET_FIELDS_IDX.big; i <= tc.BET_FIELDS_IDX.double; i++) {
        this.odds[i] = tc.COMODDS;
    }
};

// 初始化
Bet.prototype.ctor = function() {
    var self = this;
    self.reset();

    // 当前期号
    var curIssue = lottery.getNO();

    // 查询当前
    lotterySql.getBetRows((err, rows) => {
        if (err) {
            // 查询报错处理
        } else {
            for (var l in rows) {
                var row = rows[l];
                var uid = row.uid;
                var issue = row.issue;
                if (issue == curIssue) {
                    var betData = self.bets[uid];
                    if (betData == undefined) {
                        betData = tc.gf.initBetArray();
                        self.bets[uid] = betData;
                    }
                    for (var key in row) {
                        var idx = tc.BET_FIELDS_IDX[key];
                        if(idx) {
                            if (idx < tc.BET_FIELDS_IDX.big) {
                                var array = JSON.parse(row[key]);
                                for (var i in array) {
                                    betData[idx][i] += array[i];
                                }
                            } else {
                                betData[idx] += parseInt(row[key]);
                            }
                        }
                    }
                } else {
                    // 不是当前的期号的下注还没有结算 默认返还玩家相应的额度
                    var sum = 0;
                    for (var key in row) {
                        var idx = tc.BET_FIELDS_IDX[key];
                        if(idx) {
                            if (idx < tc.BET_FIELDS_IDX.big) {
                                var array = JSON.parse(row[key]);
                                for (var i in array) {
                                    sum += array[i];
                                }
                            } else {
                                sum += parseInt(row[key]);
                            }
                        }
                    }
                    userSql.addUserQuota(uid, sum, (err, res) => {
                        if(err) {
                            // 错误处理
                        } else {
                            lotterySql.updateGain(issue, uid, 0, function (err, res) {

                            });
                        }
                    });
                }
            }
        }
    });
};

// 重置
Bet.prototype.reset = function() {
    this.bets = {};
};

// 统计
Bet.prototype.statistic = function() {

};

// 大小结果
Bet.prototype.getSizeRes = function(sum) {
    if(sum < 23) {
        return tc.BET_FIELDS_IDX.small;
    } else if(sum > 23) {
        return tc.BET_FIELDS_IDX.big;
    }
    return tc.BET_FIELDS_IDX.none;
};

// 单双结果
Bet.prototype.getSinDouRes = function(sum) {
    if (sum % 2 == 0) {
        return tc.BET_FIELDS_IDX.even;
    }
    return tc.BET_FIELDS_IDX.single;
};

// 结算
Bet.prototype.settle = function() {
    var self = this;
    var bets = self.bets;
    lottery.queryResult((issue, result) => {
        var sum = 0;
        result.forEach((v) => {
           sum += v;
        });
        // 大小结果
        var sizeRes = self.getSizeRes(sum);
        // 单双结果
        var comRes = self.getSinDouRes(sum);

        var gains = [];
        for (var uid in bets) {
            var bet = bets[uid];
            var gain = 0;
            var betNum = 0;
            tc.gf.forBetFieldsEx((idx, num, field) => {
                if(result[idx] == num) {
                    betNum += bet[idx][num];
                    gain += bet[idx][num] * self.odds[idx][num];
                }
            }, (idx, field) => {
                if(idx == sizeRes || idx == comRes) {
                    betNum += bet[idx];
                    gain += self.odds[idx] * bet[idx];
                }
            });
            gains.push({u:uid, g:gain, r:gain - betNum});
        }

        // 刷新数据库
        var settleSql = function(idx) {
            var d = gains[idx];
            if(d) {
                userSql.addUserQuota(d.u, d.g, (err, rows) => {
                    if(!err) {
                        lotterySql.updateGain(issue, d.u, d.g, d.r, (err, row) => {
                            settleSql(idx + 1);
                        });
                    } else {
                        settleSql(idx + 1);
                    }
                })
            }
        };
        settleSql(0);
    });
    self.reset();
};

// 循环下注的json数据
Bet.prototype.forBetJson = (btnJsons, callback) => {
    for (var i in btnJsons) {
        if(i < 5) {
            for (var j in btnJsons[i]) {
                callback(parseInt(i), parseInt(j), btnJsons[i][j]);
            }
        } else {
            callback(parseInt(i), -1, btnJsons[i]);
        }
    }
};

// 下注
Bet.prototype.execute = function(req, res){
    var self = this;
    var uid = req.payload && req.payload.userid || req.body.uid;
    var bet = req.body.data;

    if (lottery.state != tc.lotteryState.bet) {
        tc.gf.send(res, tc.errorCode.bet_fail);
        return ;
    }

    // 判断额度是否充足
    var sum = 0;
    self.forBetJson(bet, (i, j, value) => {
        sum += value;
    });
    userSql.getUserInfo(uid, function(err, rows){
        if(err) {
            tc.gf.send(res, tc.errorCode.query_fail);
        } else {
            if (rows.length == 0) {
                tc.gf.send(res, tc.errorCode.quota_not);
            } else {
                var quota = rows[0].quota;
                if(quota < sum) {
                    tc.gf.send(res, tc.errorCode.quota_not);
                } else {
                    quota -= sum;
                    // 刷新数据库
                    userSql.updateUserQuota(uid, quota, (err, row) => {
                        if (err) {
                            tc.gf.send(res, tc.errorCode.query_fail);
                        } else {
                            var betData = self.bets[uid];
                            if(betData == undefined) {
                                betData = tc.gf.initBetArray();
                                self.bets[uid] = betData;
                            }
                            self.forBetJson(bet, (i, j, value) => {
                                if(j >= 0) {
                                    betData[i][j] += value
                                } else {
                                    betData[i] += value
                                }
                            });

                            var issue = lottery.getNO();
                            // 保存数据库
                            lotterySql.bet(issue, uid, betData, (err, row) => {
                                if(err){
                                    tc.gf.send(res, tc.errorCode.query_fail);
                                } else {
                                    tc.gf.send(res, null, {quota:quota});
                                }
                            });
                        }
                    });
                }
            }
        }
    });
};

Bet.prototype.betGain = function(req, res) {
    var uid = req.payload && req.payload.userid || req.query.uid;
    var issue = req.query.issue;
    lotterySql.getBetGain(issue, uid, (err, row) => {
        if (err || row == undefined) {
            tc.gf.send(res, tc.errorCode.query_fail);
        } else {
            tc.gf.send(res, null, {gain:row.gain});
        }
    });
};

module.exports = new Bet();
