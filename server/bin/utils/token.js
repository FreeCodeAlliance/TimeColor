// token管理类
var jwt = require('jwt-simple');
var uuid = require('node-uuid');
var secretKey = uuid.v4();
var moment = require('moment');
var expires = moment().add(7, 'day').valueOf();

var tokenMgr = module.exports;

// 获取token
tokenMgr.getToken = (uid, type) => {
    return jwt.encode({
        userid:uid,
        type:type,
        exp: expires
    }, secretKey);
};

// 验证token
tokenMgr.verifyToken = (req, res, next, type) => {
    var token = (req.body && req.body.token) || (req.query && req.query.token) || req.headers['x-access-token'];
    if (token) {
        try {
            var uid = tc.gf.getUid(req);
            var payload = jwt.decode(token, secretKey);

            if (payload.userid === parseInt(uid) && type == payload.type) {
                next();
            } else {
                tc.gf.send(res, tc.errorCode.token_fail);
            }
        } catch (err) {
            tc.gf.send(res, tc.errorCode.token_fail);
        }
    } else {
        tc.gf.send(res, tc.errorCode.token_fail);
    }
};