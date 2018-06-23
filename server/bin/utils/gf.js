// 全局通用行数
var crypto = require('crypto');
var sdTime = require('silly-datetime');
var gf = {};

// 发送数据
gf.send = (res, code, data) => {
    res.send({errorCode:code?code:null, data:data?data:{}});
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

// 获取发送的uid
gf.getUid = (req) => {
    var uid = (req.body && req.body.uid) || (req.query && req.query.uid) || req.headers['x-access-uid'];
    if(typeof(uid) == 'string')
        uid = parseInt(uid);
    return uid;
};

// 过滤表格中的数据
gf.filterRow = (row) => {
    var dest = {};
    var filter= ['password','date','remark', 'uid'];
    for(var attr in row) {
        if(filter.indexOf(attr) < 0) {
            if(attr == 'quota') {
                dest[attr] = parseInt(row[attr]);
            } else {
                dest[attr] = row[attr];
            }
        }
    }
    return dest;
};

gf.filterRows = (rows) => {
    for(var attr in rows) {
        rows[attr] = gf.filterRow(rows[attr]);
    }
    return rows;
};

tc.gf = gf;