
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
 删除礼包 post
 body: id 
*/
export const removeGiftRecord = (req, res) => {
    const { id } = req.body;
    mysql.query({
        sql:`DELETE FROM giftsdetail WHERE uid="${id}"`,
        func:(err, rows) => {
            if(err == null && rows.affectedRows > 0)
            {
                console.log(res);
		tc.gf.send(res);
            } else {
                return  tc.gf.send(res, tc.errorCode.query_fail);
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

/*
 删除用户所有礼包 post
 body: id 
*/
export const removeAllGiftsRecord = (req, res) => {
    const { id } = req.body;
    mysql.query({
        sql:`DELETE FROM giftsdetail WHERE userId="${id}"`,
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
