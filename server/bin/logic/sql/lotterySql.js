// 开奖的数据库操作
var util = require('util');
var mysql = require('../../db/mysql');

var lotterySql = module.exports;

// 插入开奖结果
lotterySql.insertLotteryResult = (issue, result, callback)=> {
    mysql.query({
        sql:'INSERT INTO lottery(issue, result, date) VALUES(?, ?, ?)',
        args:[issue, result.join(''), tc.gf.getCurTimeFormat()],
        func:callback
    });
};

// 修改开奖结果
lotterySql.modifylottery = (issue, masterid, modify, callback)=> {
    var resultStr = modify.join('');
    mysql.query({
        sql:'UPDATE lottery SET result = ? WHERE issue = ?',
        args:[resultStr, issue],
        func:(err, res) => {
            if (err) {
                callback(err, res);
            } else {
                mysql.query({
                    sql:'INSERT INTO modifylottery(masterid, issue, date, modify) VALUES(?, ?, ?, ?)',
                    args:[masterid, issue, tc.gf.getCurTimeFormat(), resultStr],
                    func:callback
                });
            }
        }
    });
};

// 获取开奖结果
lotterySql.getLotteryResult = (issue, callback) => {
    mysql.query({
        sql:`SELECT * FROM lottery WHERE issue = ${issue}`,
        func:(err, rows) => {
            if (err) {
                callback(err)
            } else {
                callback(err, rows[0]);
            }
        }
    });
};

// 获取今日开奖结果
lotterySql.getTodayResult = (issue, callback) => {
    var json = tc.gf.getCurTimeJson();
    var minIssue = util.format("%d%s%s000", json.year, tc.gf.prefixInteger(json.month), tc.gf.prefixInteger(json.day));
    mysql.query({
        sql: `SELECT * FROM lottery WHERE issue > ${minIssue} AND issue < ${issue}`,
        func:(err, rows) => {
            if(err) {
                callback(err);
            } else {
                callback(err, rows);
            }
        }
    });
};

// 获取数据库中未结算的下注情况
lotterySql.getBetRows = (callback) => {
    mysql.query({
        sql:'SELECT * FROM bet WHERE gain < 0',
        func:callback
    });
};

// 用户下注  'tth', 'tho', 'hun', 'ten', 'ind', 'big', 'small'
lotterySql.bet = (issue, uid, bet, callback) => {
    mysql.query({
        sql: `SELECT * FROM bet WHERE issue = ${issue} AND uid = ${uid}`,
        func: (err, rows) => {
            if (err) {
                callback(err)
            } else {
                if (rows.length == 0) {
                    var sqlStr = [];
                    var args = [issue, uid];
                    tc.gf.forBetFields((idx, field) => {
                        args.push(JSON.stringify(bet[idx]));
                        sqlStr.push('?');
                    }, (idx, field) => {
                        args.push(bet[idx]);
                        sqlStr.push('?');
                    });
                    var sqlStr = `INSERT INTO bet(issue, uid, ${tc.BET_FIELDS.join(' ,')}) VALUES(?, ?, ${sqlStr.join(' ,')})`;
                    mysql.query({sql:sqlStr, args:args, func:callback});
                } else {
                    var sqlStr = 'UPDATE bet SET ';
                    var sqlfields = [];
                    var args = [];
                    tc.gf.forBetFields((idx, field) => {
                        sqlfields.push(`${field}=?`);
                        args.push(JSON.stringify(bet[idx]));
                    }, (idx, field) => {
                        sqlfields.push(`${field}=?`);
                        args.push(bet[idx]);
                    });
                    sqlStr += sqlfields.join(',');
                    sqlStr += ` WHERE issue = ${issue} AND uid = ${uid}`;
                    mysql.query({sql:sqlStr, args:args, func:callback});
                }
            }
        }
    });
};

// 刷新下注的获利
lotterySql.updateGain = (issue, uid, gain, res, callback) => {
    mysql.query({
        sql:`UPDATE bet SET gain = ${gain}, res = ${res} WHERE issue = ${issue} AND uid = ${uid}`,
        func:callback
    });
};

// 获取下注的获利
lotterySql.getBetGain = (issue, uid, callback) => {
    mysql.query({
        sql: `SELECT * FROM bet WHERE issue = ${issue} AND uid = ${uid}`,
        func:(err, rows) => {
            if(err) {
                callback(err);
            } else {
                callback(err, rows[0]);
            }
        }
    });
};

// 获取玩家的今日输赢
lotterySql.getUserRes = (uid, callback) => {
    var date =  new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var minIssue = util.format("%d%s%s000", year, tc.gf.prefixInteger(month), tc.gf.prefixInteger(day));
    var maxIssue = util.format("%d%s%s999", year, tc.gf.prefixInteger(month), tc.gf.prefixInteger(day));
    mysql.query({
        sql: `SELECT * FROM bet WHERE issue > ${minIssue} AND issue < ${maxIssue} AND uid = ${uid} AND gain >= 0`,
        func:(err, rows) => {
            if(err) {
                callback(0);
            } else {
                if(rows.length > 0) {
                    var sum = 0;
                    for(var idx in rows) {
                        var row = rows[idx];
                        sum += row.res;
                    }
                    callback(sum);
                } else {
                    callback(0);
                }
            }
        }
    });
};

// 查询开奖结果
lotterySql.getlotterylog = (uid, minIssue, maxIssue, callback) => {
    var sqlStr = `SELECT lottery.issue AS issue, lottery.result AS result, lottery.date AS date, bet.res AS win FROM lottery LEFT JOIN bet ON bet.uid = ${uid} AND lottery.issue = bet.issue WHERE lottery.issue > ${minIssue} AND lottery.issue < ${maxIssue} ORDER BY lottery.issue DESC`
    mysql.query({
        sql: sqlStr,
        func:(err, rows) => {
            if(err) {
                callback(err);
            } else {
                callback(err, rows);
            }
        }
    });
};

// 获取下注记录
lotterySql.getbetlog = (uid, issue, callback) => {
    mysql.query({
        sql:`SELECT tth, tho, hun, ten, ind, big, small, single, even, res FROM bet WHERE uid = ${uid} AND issue = ${issue}`,
        func:(err, rows) => {
            if(err) {
                callback(err);
            } else {
                var row = rows[0];
                if(row) {
                    tc.gf.forBetFields((idx, key) => {
                        row[key] = JSON.parse(row[key]);
                    }, (idx, key) => {
                        row[key] = parseInt(row[key]);
                    });
                }
                callback(err, row);
            }
        }
    });
};
