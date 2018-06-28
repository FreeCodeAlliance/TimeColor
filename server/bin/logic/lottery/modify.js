// 修改开奖结果
var lottery = require('./lottery');
var lotterySql = require('../sql/lotterySql');

var modify = module.exports;

modify.setLottery = (req, res) => {
    var issue = lottery.getNO();
    var result = req.body.result;
    var masterid = req.payload.userid;

    lotterySql.modifylottery(issue, masterid, result, (err, quryres) => {
        if (err) {
            tc.gf.send(res, tc.errorCode.query_fail);
        } else {
            lottery.lotteryRes[issue] = result;
            tc.gf.send(res);
        }
    });
};