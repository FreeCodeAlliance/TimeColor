# TimeColor
get:
注册审核通过： 		/masters/registerCheck?account=dd&check=true
注册审核不通过		/masters/registerCheck?account=dd&check=false
获取审核列表：		/masters/checkList
用户登录：	      	/users/login?account=dd&password=dd
管理员登录：	  	/masters/login?account=dd&password=dd
获取用户列表：		/masters/getUsers?starLine=1&count=1 其中startLine和count可以不发送 默认获取服务器设置的最大数量
登录者自己的信息:	/index/getInfo
获取开奖状态:		/index/lotteryState   返回:data:{time:4555, state:1, no:"xxxx"} time剩余时间（单位是秒） state开奖状态 1下注阶段 2锁盘阶段 3停止开奖 no开奖期号
获取服务器开奖的配置/index/lotteryConfig  返回:data:{interval:xx, lock:xx, times:[[9, 11], [13, 21]]}  interval开奖间隔时间 lock每次开奖的锁盘时间 times开奖的区间时间 单位是分
获取开奖结果:		/index/lotteryRes?no=xxx     返回:data:[1, 2, 3, 4, 5]  数组顺序是 万 千 百 十 个   no是开奖期号 如果不加期号默认是当前开奖的期号
获取开奖赔率：      /index/lotteryOdds     返回data:[1, 2, 3, 4, 5, 6, 7] 数组顺序是 万 千 百 十 个 大 小

post:
用户注册申请：		/users/register 	body：account password 
管理员注册申请：	/masters/register 	body：account password
充值：				/masters/recharge   body: sid value  其中sid是要充值的id
管理员设置开奖：	/masters/modify		body: result 其中result是5个元素数组 [万, 千, 百, 十, 个] 

注意：
	1、除了注册和登录的请求之外，其他请求必须发送token，token是登录请求服务器发给客户端的。
		token也可以放在头部中，x-access-token 
	2、返回值：quota的字段是int类型，其他都是string类型
