# TimeColor
get:
注册审核通过： 		/masters/registerCheck?account=dd&check=true
注册审核不通过		/masters/registerCheck?account=dd&check=false
获取审核列表：		/masters/checkList
用户登录：	      	/users/login?account=dd&password=dd
管理员登录：	  	/masters/login?account=dd&password=dd
获取用户列表：		/masters/getUsers?starLine=1&count=1 其中startLine和count可以不发送 默认获取服务器设置的最大数量

post:
用户注册申请：		/users/register 	body：account password disktype quota remark
管理员注册申请：	/masters/register 	body：account password
充值：				/masters/recharge   body: uid value
