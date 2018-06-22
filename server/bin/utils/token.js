// token管理类
var jwt = require('jwt-simple');
var uuid = require('node-uuid');
var secretKey = uuid.v4();

var tokenMgr = module.exports;

// 获取token
tokenMgr.getToken = (uid) => {
};