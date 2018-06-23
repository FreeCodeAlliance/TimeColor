// 充值
var mysql = require('../db/mysql');
var Recharge = () => {};

// 获取用户列表
Recharge.prototype.getUsers = (req, res) => {
    var startLine = req.query.startLine;
    var count = req.query.count;

    startLine = startLine ? startLine : 0;
    count = count ? count : 9999999999999999;

    mysql.query({
        sql:`SELECT * FROM userinfo LIMIT ${startLine},${count}`,
        func:(err, rows) => {
            if (err || rows.length == 0) {
                tc.gf.send(res, null, {});
            } else {
                tc.gf.send(res, null, tc.gf.filterRows(rows));
            }
        },
    });
};

// 充值
Recharge.prototype.execute = (req, res) => {
    var account = req.body.account;
    var value = req.body.value;
    var masterid = req.payload.userid;
    mysql.query({
        sql:`SELECT * FROM userinfo WHERE account="${account}"`,
        func:(err, rows) => {
            if (err) {
                tc.gf.send(res, tc.errorCode.query_fail);
            } else if (rows.length == 0) {
                tc.gf.send(res, tc.errorCode.account_null);
            } else {
                var row = rows[0];
                var quota = parseInt(row.quota);
                quota = quota + parseInt(value);
                mysql.query({
                    sql:'UPDATE userinfo SET quota = ? WHERE account = ?',
                    args:[quota, account],
                    func:(err, ret) => {
                        if (err == null && ret.affectedRows == 1) {
                            tc.gf.send(res, null, {value:quota});

                            // 记录充值记录
                            mysql.query({
                                sql:'INSERT INTO recharge(userid,value,date,masterid) VALUES(?,?,?,?)',
                                args:[row.uid, value, tc.gf.getCurTimeFormat(), masterid]
                            });
                        } else {
                            tc.gf.send(res, tc.errorCode.query_fail);
                        }
                    }
                });
            }
        }
    });
};

module.exports = new Recharge();
