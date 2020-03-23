<!DOCTYPE html>
<html>
	<head>
		<title>注册 - 希可尔图书</title>
		<#include "controls/header.ftl">
		<script type="text/javascript" src="${model._contextPath}/mobile/resources/js/register.js"></script>
	</head>
	<body>
		<!--头部-->
		<div class="header">
			<a href="javascript:void(0);" class="tbr_rbtn" data-icon="&#xe62a;" title="返回" style="width:auto">注册希可尔图书</a>
		</div>
		<!--头部 end-->
	    
		<div class=" mycontainer">
			<div class="contactus" style="margin-top:20px; text-align:left">
		     	<form method="post" id="js-register-form" action="${model._contextPath}/p100042.html">
		            <p style="width:90%; margin:0 auto">          
		              <input name="username" type="text" id="username" placeholder="手机号" pattern="[0-9]{11}">
		              <input name="pwd" type="password" id="pwd" placeholder="密码(6-16位)" maxlength="16">
		              <input type="hidden" name="openid" id="openid" value="<#if model._param.wx?exists>${model._param.wx}</#if>">
		              <input name="ck" id="ck" type="checkbox" value="" onClick="showps()">&nbsp;显示密码
		              <input type="button" id="js-register" class="release_btn" value="提交注册">
		              <input type="button" class="delgs_btn" onClick="location.href='login.html'" value="已有账号？立即登录">
		            </p>
		        </form>
			</div>
		</div>
	</body>
</html>
