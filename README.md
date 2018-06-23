# TimeColor
get:
注册审核通过： 		/masters/registerCheck?account=dd&check=true&uid=dd
注册审核不通过		/masters/registerCheck?account=dd&check=false&uid=dd
获取审核列表：		/masters/checkList&uid=dd
用户登录：	      	/users/login?account=dd&password=dd
管理员登录：	  	/masters/login?account=dd&password=dd
获取用户列表：		/masters/getUsers?starLine=1&count=1&uid=dd 其中startLine和count可以不发送 默认获取服务器设置的最大数量

post:
用户注册申请：		/users/register 	body：account password 
管理员注册申请：	/masters/register 	body：account password
充值：				/masters/recharge   body: uid sid value  其中uid是管理员id sid是要充值的id

注意：
	除了注册和登录的请求之外，其他请求必须发送token和uid，token和uid是登录请求服务器发给客户端的。
	token和uid也可以放在头部中，x-access-token 和 x-access-uid
