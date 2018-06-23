// 登入处理
var mysql = require('../../db/mysql');
var token = require('../../utils/token');
var login = {
    execute:(req, res, tableName) => {
        var account = req.query.account;
        var password = req.query.password;
        var type = 'users';
        if(tableName == 'masterinfo')
            type = 'masters';

        mysql.query({
            sql:`SELECT * FROM ${tableName} WHERE account="${account}"`,
            func:(err, rows) => {
                if (err) {
                    tc.gf.send(res, tc.errorCode.query_fail);
                } else {
                    if(rows.length == 0) {
                        tc.gf.send(res, tc.errorCode.account_null);
                    } else {
                        var row = rows[0];
                        if (tc.gf.md5(password) === row.password) {
                            row.token = token.getToken(row.uid,type);
                            tc.gf.send(res, null, tc.gf.filterRow(row));
                        } else {
                            tc.gf.send(res, tc.errorCode.password_error);
                        }
                    }
                }
            }
        });
    },

    user:(req, res) => {
        login.execute(req, res, "userinfo");
    },

    master:(req, res) => {
        login.execute(req, res, "masterinfo");
    },
};

module.exports = login;