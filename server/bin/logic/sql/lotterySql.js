// 开奖的数据库操作
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

// 用户下注
// lotterySql.bet = (issue, uid, moneyArray, callback) => {
//     mysql.query({
//         sql:`SELECT * FROM bet WHERE issue = ${issue} AND uid = ${uid}`,
//         func:(err, rows) => {
//             if (err) {
//                 callback(err)
//             } else {
//                 var fields = tc.BET_FIELDS;
//                 if (rows.length == 0) {
//                     var sqlfields = [];
//                     var marks = [];
//                     var args = [issue, uid];
//                     for(var i=0, len = fields.length; i < len; i++) {
//                         var field = fields[i];
//                         sqlfields.push(fields[i]);
//                         marks.push('?');
//                         args.push(moneyArray[i]);
//                     }
//                     var sqlStr = `INSERT INTO bet(issue, uid, ${sqlfields.join(' ,')}) VALUES(?, ?, ${marks.join(' ,')})`;
//                     mysql.query({sql:sqlStr, args:args, func:callback});
//                 } else {
//                     var row = rows[0];
//                     var args = [];
//                     var sqlStr = 'UPDATE bet SET ';
//                     var sqlfields = [];
//                     for(var i=0, len = fields.length; i < len; i++) {
//                         var field = fields[i];
//                         sqlfields.push(`${field}=?`);
//                         args.push(row[field] + moneyArray[i]);
//                     }
//                     sqlStr += sqlfields.join(',');
//                     sqlStr += ` WHERE issue = ${issue} AND uid = ${uid}`;
//                     mysql.query({sql:sqlStr, args:args, func:callback});
//                 }
//             }
//         }
//     });
// };

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
lotterySql.updateGain = (issue, uid, gain, callback) => {
    mysql.query({
        sql:`UPDATE bet SET gain = ${gain} WHERE issue = ${issue} AND uid = ${uid}`,
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
