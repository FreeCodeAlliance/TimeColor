// 用户信息
var mysql = require('../db/mysql');
var User = () => {};

// 获取用户本身的数据
User.prototype.getInfo = function (req, res) {
    var type = req.payload.type;
    if (type == "users") {
        this.getTableInfo(req, res, 'userinfo');
    } else {
        this.getTableInfo(req, res, 'masterinfo');
    }
};

// 获取表格数据
User.prototype.getTableInfo = (req, res, tableName) => {
    var uid = req.payload.userid;
    mysql.query({
        sql:`SELECT * FROM ${tableName} WHERE uid=${uid}`,
        func:(err, rows) => {
            if (err) {
                tc.gf.send(res, tc.errorCode.query_fail);
            } else {
                tc.gf.send(res, null, tc.gf.filterRow(rows[0]));
            }
        }
    });
};

module.exports = new User();