
var mysql = require('../../db/mysql');
var moment = require('moment');
/*
 给用户礼包 post
 userId:
 name:
 fightTimes: 
*/
export const giveUserGift = (req, res) => {
    const {userId, name, giftQuality} = req.body;
    var createrSql = `INSERT INTO giftsdetail(userId, name, giftQuality, date) VALUES(?,?,?,?)`;
    var createrArgs = [userId, name, giftQuality, tc.gf.getCurTimeFormat()];
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
export const removeGiftRecord = (req, res) => {
    const { id } = req.body;
    console.warn('func--------->', id);
    mysql.query({
        sql:`DELETE FROM giftsdetail WHERE uid="${id}"`,
        func:(err, rows) => {
            if(err == null && rows.affectedRows > 0)
            {
                tc.gf.send(res);
            } else {
                tc.gf.send(res, tc.errorCode.query_fail);
            }
        },
    });
}

/*
 获取用户礼包列表
*/

export const getUerGifts = (req, res) => {
    const tableName = 'giftsdetail';
    mysql.query({
        sql: `SELECT * FROM ${tableName}`,
        func: (err, rows) => {
            if (!err) {
                //console.log(rows);
                tc.gf.send(res, null, rows);
            }
        }
    })
}