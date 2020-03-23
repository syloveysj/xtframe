<!DOCTYPE html>
<html>
	  <head>
			<title>修改密码</title>
			<#include "controls/header.ftl"> 
			<script type="text/javascript" src="${model._contextPath}/mobile/resources/js/modify.js"></script>
			<script type="text/javascript" src="${model._contextPath}/mobile/resources/js/search.js"></script>
	  </head>
	  <body id="totop">
	  		<!--头部-->
		<div class="header">
			<a href="javascript:window.history.back();" class="tbr_rbtn" data-icon="&#xe62a;" title="返回" style="width:auto">修改密码</a>
			<a href="javascript:void(0);" class="tbr_rbtn" data-icon="&#xe633;" title="搜索" style="right:80px;" id="mySwitch"></a>
			<a href="${model._contextPath}/index.html" class="tbr_rbtn" data-icon="&#xe612;" title="首页" style="right:40px;"></a>
			<a href="${model._contextPath}/p100047.html" class="tbr_rbtn" data-icon="&#xe62f;" title="购物车" style="right:0;"><img src="${model._contextPath}/mobile/resources/img/point.png"></a>
		</div>
		<!--头部 end-->	
		
		<#include "controls/header_search.ftl">
		
	<div class="mycontainer">
	  		<div class="contactus" style="margin-top:20px;text-align:left">
	  				<p style="wodth:90%;margin:0 auto" id="clear1" >
	  					<input name="pastPassWord"  type="password" id="pastPassWord" placeholder="旧密码(6-16位)" maxlength="16" >
	  					<input name="newPassWord"  type="password" id="newPassWord" placeholder="新密码(6-16位)" maxlength="16" >
	  					<input name="newPassWords" type="password" id="newPassWords" placeholder="再次输入新密码(6-16位)" maxlength="16" >
	  					<input type="button" id="js-modify" class="release_btn" value="确认修改">
	  				</p>
	  		</div>
	  </div>
	</body>
</html>