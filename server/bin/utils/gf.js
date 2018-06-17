// 全局通用行数
var crypto = require('crypto');
var sdTime = require('silly-datetime');
var gf = {};

// 发送数据
gf.send = (res, code, data) => {
    res.send({errorCode:code?code:"", data:data?data:{}});
};

// md5
gf.md5 = (text) => {
    if(typeof(text) != 'string')
        text = String(text);

    return crypto.createHash('md5').update(text).digest('hex');
};

// 获取当前时间 格式：'YYYY-MM-DD HH:mm:ss'
gf.getCurTimeFormat = () => {
    return sdTime.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
};

// 将格式装换成时间戳
gf.toTime = (str) => {
    return new Date(str).getTime();
};

tc.gf = gf;