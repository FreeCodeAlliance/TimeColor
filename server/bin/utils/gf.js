// 全局通用行数
var gf = {};

// 发送数据
gf.send = (res, state, code, data) => {
    res.send({responseState:state, errorCode:code?code:"", data:data?data:{}});
};

tc.gf = gf;