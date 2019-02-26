var mysql = require('../../db/mysql');

export const getUsersInfo = (req, res) => {
    const tableName = 'giftsuserinfo';
    mysql.query({
        sql: `SELECT * FROM ${tableName}`,
        func: (err, rows) => {
            //console.log(err);
            if (!err) {
                //console.log(rows);
                tc.gf.send(res, null, rows);
            }
        }
    })
}

/*
 创建新用户 post
 name:
 fightTimes: 
*/
export const createUser = (req, res) => {
    const {name, fightTimes} = req.body;
    var createrSql = `INSERT INTO giftsuserinfo(name, fightTimes) VALUES(?,?)`;
    var createrArgs = [name, fightTimes];
    mysql.query({
        sql:createrSql, args:createrArgs,
        func:(err, rows) => {
            if(err){
                tc.gf.send(res, tc.errorCode.query_fail);
            } else {
                tc.gf.send(res, null, {uid:rows.insertId});
            }
        },
    })
            
}
/*
 删除用户 post
 name:
 fightTimes: 
*/
export const removeUser = (req, res) => {
    const { id } = req.body;
    mysql.query({
        sql:`DELETE FROM giftsuserinfo WHERE uid="${id}"`,
        func:(err, rows) => {
            if(err){
                tc.gf.send(res, tc.errorCode.query_fail);
            } else {
                tc.gf.send(res, null, {uid:rows.insertId});
            }
        },
    });
}

/*
用户签到 参战次数
*/
export const userSignIn = (req, res) => {
    const { uid, fightTimes } = req.body;
    mysql.query({
        sql:'UPDATE giftsuserinfo SET fightTimes = ? WHERE uid = ?',
        args:[fightTimes, uid],
        func:(err, rows) => {
            if(err){
                tc.gf.send(res, tc.errorCode.query_fail);
            } else {
                tc.gf.send(res, null, {result: true});
            }
        }
    });
}