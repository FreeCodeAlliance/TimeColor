// 注册处理
var mysql = require('../../db/mysql');

var register = {
    userExecute:(req, res) => {
        var account = req.body.account;
        var password = req.body.password;

        mysql.query({
            sql:'SELECT * FROM register WHERE account=?',
            args:[account],
            func:(err, rows) => {
                if (err) {
                    tc.gf.send(res, tc.errorCode.query_fail);
                }  else {
                    if (rows.length == 0)
                    {
                        mysql.query({
                            sql:"SELECT * FROM userinfo WHERE account=?",
                            args:[account],
                            func:(err, rows) => {
                                if (err) {
                                    tc.gf.send(res, tc.errorCode.query_fail);
                                }  else {
                                    if (rows.length == 0)
                                    {
                                        var  addSql = 'INSERT INTO register(account,password,date,remark) VALUES(?,?,?,?)';
                                        var  addArgs = [account, tc.gf.md5(password),tc.gf.getCurTimeFormat(), remark];
                                        mysql.query({
                                                sql:addSql, args:addArgs,
                                                func:(err, rows) => {
                                                    if(err){
                                                        tc.gf.send(res, tc.errorCode.query_fail);
                                                    } else {
                                                        tc.gf.send(res);
                                                    }
                                                },
                                            });
                                        } else {
                                            tc.gf.send(res, tc.errorCode.account_used);
                                        }
                                    }
                                }
                        });
                    } else {
                        tc.gf.send(res, tc.errorCode.account_used);
                    }
                }
            },
        });
    },

    testExecute:(req, res) => {
        var account = req.body.account;
        var password = req.body.password;
        mysql.query({
            sql:"SELECT * FROM userinfo WHERE account=?",
            args:[account],
            func:(err, rows) => {
                if (err) {
                    tc.gf.send(res, tc.errorCode.query_fail);
                }  else {
                    if (rows.length == 0)
                    {
                        var  addSql = 'INSERT INTO userinfo(account,password,date) VALUES(?,?,?)';
                        var  addArgs = [account, tc.gf.md5(password), tc.gf.getCurTimeFormat()];
                        mysql.query({
                            sql:addSql, args:addArgs,
                            func:(err, rows) => {
                                if(err){
                                    tc.gf.send(res, tc.errorCode.query_fail);
                                } else {
                                    tc.gf.send(res, null, {uid:rows.insertId});
                                }
                            },
                        });
                    } else {
                        tc.gf.send(res, tc.errorCode.account_used);
                    }
                }
            }
        });
    },

    // 审查注册成功
    success:(req, res) => {
        var account = req.query.account;

        mysql.query({
            sql:'SELECT * FROM register WHERE account =' + account,
            func:(err, rows) => {
                if(err == null && rows.length > 0) {
                    var row = rows[0];
                    var addSql = 'INSERT INTO userinfo(account,password,disktype,date,remark) VALUES(?,?,?,?,?)';
                    var addArgs = [row.account, row.password,row.disktype,tc.gf.getCurTimeFormat(), row.remark];
                    mysql.query({
                        sql:addSql, args:addArgs,
                        func:(err, rows) => {
                            if(err){
                                tc.gf.send(res, tc.errorCode.query_fail);
                            } else {
                                tc.gf.send(res);
                            }
                        },
                    });

                    mysql.query({sql:'DELETE FROM register WHERE account=' + account});
                } else {
                    tc.gf.send(res, tc.errorCode.query_fail);
                }
            }
        });
    },

    fail:(req, res) => {
        var account = req.query.account;
        var delSql = 'DELETE FROM register WHERE account=' + account;
        mysql.query({
            sql:delSql,
            func:(err, rows) => {
                if(err == null && rows.affectedRows > 0)
                {
                    tc.gf.send(res);
                } else {
                    tc.gf.send(res, tc.errorCode.query_fail);
                }
            },
        });
    },

    getlist:(req, res) => {
        mysql.query({
            sql:'SELECT * FROM register',
            func:(err, rows) => {
                if(err)
                {
                    tc.gf.send(res, tc.errorCode.query_fail);
                } else {
                    tc.gf.send(res, null, rows);
                }
            },
        });
    },

    registerCheck:(req, res) => {
        var check = req.query.check;
        if (check == "true") {
            register.success(req, res);
        } else {
            register.fail(req, res);
        }
    },
};

module.exports = register;