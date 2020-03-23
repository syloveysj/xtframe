<!DOCTYPE html>
<html>
	<head>
		<title>登录 - 希可尔图书</title>
		<#include "controls/header.ftl">
	</head>
<body>
	<!--头部-->
	<div class="header">
		<a href="javascript:void(0);" class="tbr_rbtn" data-icon="&#xe62a;" title="返回" style="width:auto">登录希可尔图书</a>
	    <a href="getpwd.html" class="tbr_rbtn" title="找回密码" style="right:1em; width:auto">找回密码</a>
	</div>
	<!--头部 end-->
	<div class=" mycontainer">
		<div class="contactus" style="margin-top:20px">
			<form id="form1" method="post" action="${model._contextPath}/p100039.html">
				<p style="width:90%; margin:0 auto">
					<input name="username" type="text" id="username" placeholder="手机号" maxlength="11" pattern="[0-9]{11}">
					<input name="pwd" type="password" id="pwd" placeholder="密码(6-16位)" maxlength="16">
					<input type="submit" class="release_btn" value="确认登录">
					<input type="button" class="delgs_btn" onClick="location.href='register.html'" value="没有账号？立即注册">
				</p>
			</form>
		</div>
	</div>
</body>
</html>
