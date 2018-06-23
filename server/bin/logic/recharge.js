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
    var sid = req.body.sid;
    var value = req.body.value;
    var uid = tc.gf.getUid(req);
    mysql.query({
        sql:`SELECT * FROM userinfo WHERE uid="${sid}"`,
        func:(err, rows) => {
            if (err) {
                tc.gf.send(res, tc.errorCode.query_fail);
            } else if (rows.length == 0) {
                tc.gf.send(res, tc.errorCode.account_null);
            } else {
                var quota = parseInt(rows[0].quota);
                quota = quota + parseInt(value);
                mysql.query({
                    sql:'UPDATE userinfo SET quota = ? WHERE uid = ?',
                    args:[quota, sid],
                    func:(err, ret) => {
                        if (err == null && ret.affectedRows == 1) {
                            tc.gf.send(res, null, {value:quota});

                            // 记录充值记录
                            mysql.query({
                                sql:'INSERT INTO recharge(userid,value,date,masterid) VALUES(?,?,?,?)',
                                args:[sid, value, tc.gf.getCurTimeFormat(), uid]
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
