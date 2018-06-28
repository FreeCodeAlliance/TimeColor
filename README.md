# TimeColor
get:
注册审核通过： 		/masters/registerCheck?account=dd&check=true
注册审核不通过		/masters/registerCheck?account=dd&check=false
获取审核列表：		/masters/checkList
用户登录：	      	/users/login?account=dd&password=dd
管理员登录：	  	/masters/login?account=dd&password=dd
获取用户列表：		/masters/getUsers?starLine=1&count=1 其中startLine和count可以不发送 默认获取服务器设置的最大数量
登录者自己的信息:	/user/getInfo

post:
用户注册申请：		/users/register 	body：account password 
管理员注册申请：	/masters/register 	body：account password
充值：				/masters/recharge   body: sid value  其中sid是要充值的id
管理员设置开奖：	/masters/modify		body: result 其中result是5个元素数组 [万, 千, 百, 十, 个] 

注意：
	1、除了注册和登录的请求之外，其他请求必须发送token，token是登录请求服务器发给客户端的。
		token也可以放在头部中，x-access-token 
	2、返回值：quota的字段是int类型，其他都是string类型
