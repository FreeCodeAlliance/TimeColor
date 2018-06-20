// 登入处理
var mysql = require('../../db/mysql');
var login = {
    execute:(req, res) => {
        var account = req.query.account;
        var password = req.query.password;

        mysql.query({
            sql:`SELECT * FROM userinfo WHERE account="${account}"`,
            func:(err, rows) => {
                if (err) {
                    tc.gf.send(res, tc.errorCode.query_fail);
                } else {
                    if(rows.length == 0) {
                        tc.gf.send(res, tc.errorCode.account_null);
                    } else {
                        var row = rows[0];
                        if (tc.gf.md5(password) === row.password) {
                            tc.gf.send(res, null, row);
                        } else {
                            tc.gf.send(res, tc.errorCode.password_error);
                        }
                    }
                }
            }
        });
    },
};

module.exports = login;