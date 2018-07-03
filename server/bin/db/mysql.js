var mysql = require('mysql');
var pool = mysql.createPool({
    host:tc.sqlconfig.host,
    user:tc.sqlconfig.user,
    password:tc.sqlconfig.password,
    database:tc.sqlconfig.database,
    port:tc.sqlconfig.port,
});

var query = function(params) {
    var sql = params.sql;
    var args = params.args;
    var func = params.func;

    function callback(err, rows, log) {
        if (log) {
            console.log(log);
        }
        if(func) {
            func(err, rows);
        }
    };

    if (!sql) {
        callback(true, null, "sql is null");
        return;
    }

    pool.getConnection((err, conn) => {
        if(err){
            callback(err, '连接池获取连接失败')
        } else {
            if (args) {
                conn.query(sql, args, (err, rows) => {
                    conn.release();     // 释放连接
                    callback(err, rows);
                });
            } else {
                conn.query(sql, (err, rows) => {
                    conn.release();
                    callback(err, rows);
                });
            }
        }
    });
};

module.exports.query = query;