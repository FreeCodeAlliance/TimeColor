// 相关配置
//tc.md5key = 'jdlsjf!@#511863';

tc.errorCode = {
    query_fail:'数据库查询失败',
    account_used: '账号已存在',
    account_null:'账号未注册',
    password_error:'密码错误',
    token_fail:'token验证失败',
};

// 开奖间隔时间 单位分钟
tc.lotteryInterval = 3;
// 开奖锁定时间 单位分钟
tc.lotteryLock = 1;
// 开奖的区间时间 单位小时
tc.lotteryTimes = [[9, 11], [13, 21]];
// 开奖状态
tc.lotteryState = {
    bet:1,                      // 下注
    lock:2,                     // 锁盘
    stop:3,                     // 停止
};

// 测试模式
tc.TEST_MODE = false;
