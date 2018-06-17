// 全局通用行数
var crypto = require('crypto');
var sdTime = require('silly-datetime');
var gf = {};

// 发送数据
gf.send = (res, code, data) => {
    res.send({responseState:true, errorCode:code?code:"", data:data?data:{}});
};

// md5
gf.md5 = (text) => {
    return crypto.createHash('md5').update(text).digest('hex');
};

// 获取当前时间 格式：'YYYY-MM-DD HH:mm:ss'
gf.getCurTimeFormat = () => {
    return sdTime.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
};
tc.gf = gf;