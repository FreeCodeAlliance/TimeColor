### 数据接口
#### 1. GET 
| Url | 参数（body）| 返回值（data） | Description |
|---- |------------|------- |-------------|
| /users/login  |account , password |  {account:xx, disktype:xx, quota:xx, token:xx} | 用户登录 |
| /users/betgain | issue | {gain:xx} | 获取下注的获利，如果返回-1表示还未结算 |
| /users/lotterylog | day or 空 | {issue:xx, result:[], date:xx, win:xx} | 获取开奖记录：其中day是获取几天内的开奖记录，没有参数默认三天， 返回期号、开奖结果、开奖的时间、输赢 |
| /users/betlog | issue | {tth:[], tho:[], hun:[], ten:[], ind:[], big:xx, small:xx, single:xx, even:xx, res:xx} | 获取期号相对应的玩家下注详细信息：万 千 百 十 个 大 小 单 双， res是这一期的输赢结果 |
| /masters/registerCheck | account, check | {} | 注册审核是否通过，check为true通过，false不通过 |	
| /masters/checkList | | [{account:xx, password:xx, disktype:xx, date:xx, remark:xx}] | 获取审核列表 | 
| /masters/login | account , password | {account:xx, token:xx} | 管理员登录 |
| /masters/getUsers | starLine, count 或 null | [{account:x, disktype:x, quota:x}, {account:xx, disktype:xx, quota:xx}, ...] | 获取用户列表,其中startLine和count可以不发送 默认获取服务器设置的最大数量 |
| /index/getInfo | | {account:xx, disktype:xx, quota:xx, token:xx, value:xx} 或 {account:xx, token:xx} | 登录者自己的信息, 其中value是玩家今日输赢 |
| /index/lotteryState | | {time:xxx, state:x, no:"xxxx"} | 获取开奖状态：time剩余时间（单位是秒） state开奖状态 1下注阶段 2锁盘阶段 3停止开奖 no开奖期号 |
| /index/lotteryConfig | | {interval:xx, lock:xx, times:[[9, 11], [13, 21]]} | 获取服务器开奖的配置：interval开奖间隔时间 lock每次开奖的锁盘时间 times开奖的区间时间 单位是分 |
| /index/lotteryRes | no | [1, 2, 3, 4, 5] | 获取开奖结果：数组顺序是 万 千 百 十 个   no是开奖期号 如果不加期号默认是当前开奖的期号 |
| /index/lotteryOdds | | [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], ...] |  获取开奖赔率: 数组顺序是 万 千 百 十 个 大 小 单 双，其中前5个元素是一个大小为9的数组对应0-9数字的赔率，后4个元素是大小赔率 |
| /index/todayRes | | [{no:xx, res:[0, 1, 2, 3, 4]} ...] | 获取今日的开奖结果返回数组 数组里面no是期号，res是结果数组

#### 2. POST 
| Url | 参数（body）| 返回值（data） | Description |
|---- |------------|------- |-------------|
| /users/register  |account, password |  {uid:xx} | 用户注册申请 |
| /users/bet | data | {quota:xx} | 玩家下注, 其中data的数据格式 例如：{"1":{"0":5}, "5":45} 其中 1和5 表示万 千 百 十 个 大 小 单 双这样顺序的序号（从0开始），其中{"0":5}表示玩家在千位下注5个金币压数字0
| /masters/register  |account, password |  {uid:xx} | 管理员注册申请 | 
| /masters/recharge  |account, value |  {value:xx} | 其中account是要充值的账号，返回的value是账号的当前额度 |
| /masters/modify  | result |  {} | 其中result是5个元素数组 [万, 千, 百, 十, 个]  |

### 注意：
#### 1 除了注册和登录的请求之外，其他请求必须发送token，token是登录请求服务器发给客户端的。 token也可以放在头部中，x-access-token 
#### 2 返回值：quota的字段是int类型，其他都是string类型
#### 3 返回值的格式：{errorCode:xxxx, data:xxxx} 其中请求成功后返回的errorCode为空值null
