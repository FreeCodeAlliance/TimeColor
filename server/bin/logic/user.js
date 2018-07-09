// 用户信息
var mysql = require('../db/mysql');
var lotterySql = require('./sql/lotterySql');
var User = () => {};

// 获取用户本身的数据
User.prototype.getInfo = function (req, res) {
    var type = (req.payload && req.payload.type) || 'users';
    if (type == "users") {
        this.getTableInfo(req, res, 'userinfo');
    } else {
        this.getTableInfo(req, res, 'masterinfo');
    }
};

// 获取表格数据
User.prototype.getTableInfo = (req, res, tableName) => {
    var uid = (req.payload && req.payload.userid) || (req.query && req.query.uid);
    mysql.query({
        sql:`SELECT * FROM ${tableName} WHERE uid=${uid}`,
        func:(err, rows) => {
            if (err) {
                tc.gf.send(res, tc.errorCode.query_fail);
            } else {
                var data = tc.gf.filterRow(rows[0]);
                if(tableName == 'userinfo') {
                    lotterySql.getUserRes(uid, (num) => {
                        data.value = num;
                        tc.gf.send(res, null, data);
                    });
                } else {
                    tc.gf.send(res, null, data);
                }

            }
        }
    });
};

module.exports = new User();