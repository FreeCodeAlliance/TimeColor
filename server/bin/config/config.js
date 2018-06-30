// 相关配置
//tc.md5key = 'jdlsjf!@#511863';

tc.errorCode = {
    query_fail:'数据库查询失败',
    account_used: '账号已存在',
    account_null:'账号未注册',
    password_error:'密码错误',
    token_fail:'token验证失败',
    lottery_none:'未开奖',
    bet_fail:'无法下注',
    quota_not:'额度不足',
};

// 开奖间隔时间 单位分钟
tc.lotteryInterval = 10;
// 开奖锁定时间 单位分钟
tc.lotteryLock = 5;
// 开奖的区间时间 单位小时
tc.lotteryTimes = [[9, 11], [13, 21]];
// 开奖状态
tc.lotteryState = {
    bet:1,                      // 下注
    lock:2,                     // 锁盘
    stop:3,                     // 停止
};
// 下注字段名  万 千 百 十 个 大 小
tc.BET_FIELDS = ['tth', 'tho', 'hun', 'ten', 'ind', 'big', 'small'];

// 测试模式
tc.TEST_MODE = false;
