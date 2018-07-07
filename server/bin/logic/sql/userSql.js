// 用户数据库操作
var mysql = require('../../db/mysql');

var userSql = module.exports;

// 查找用户的信息
userSql.getUserInfo = (uid, callback, account) => {
    var sqlStr = 'SELECT * FROM userinfo WHERE ';
    if(uid) {
        sqlStr += `uid = ${uid}`;
    } else if (account) {
        sqlStr += `account = ${account}`;
    }
    mysql.query({sql:sqlStr, func:callback});
};

// 刷新用户的额度
userSql.updateUserQuota = (uid, quota, callback) => {
    mysql.query({
        sql:'UPDATE userinfo SET quota = ? WHERE uid = ?',
        args:[quota, uid],
        func:callback
    });
};

// 增加额度
userSql.addUserQuota = (uid, quota, callback) => {
    userSql.getUserInfo(uid, (err, rows) => {
        if(err || rows.length == 0) {
            callback(true)
        } else {
            var row = rows[0];
            userSql.updateUserQuota(uid, row.quota + quota, callback);
        }
    });
};

