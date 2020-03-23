<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="org.xtframe.util.ApplicationConfigUtil"%>

<%
String contextPath = request.getContextPath();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>系统登录</title>
<link href="<%=contextPath%>/web/css/common.css" rel="stylesheet" type="text/css" />
</head>
<body>
	<form name="loginForm" id="loginForm" action="login_control.jsp" method="post">
	<div class="ztbg">
		<div class="dl_content">
	        <div class="dl_logo"><div style="font-size:32px; font-family:'黑体';  font-weight:bold; color:#3973bf;">XTFrame平台 V1.0</div></div>
	        <div class="dl_main">
	        	<div class="dlleft_tu"><img src="<%=contextPath%>/web/images/dltu01.jpg" width="470" height="360" /></div>
	            <div class="dlright_zi">
	            	<div class="srk"><span>用户名</span><span class="kk"><img src="<%=contextPath%>/web/images/yh.jpg" width="17" height="17" /><input id="userName" name="userName" type="text" /></span></div>
	                <div class="srk"><span>密码</span><span class="kk"><img src="<%=contextPath%>/web/images/suo.jpg" width="17" height="17" /><input  id="password" name="password" type="password" class="mm" /></span></div>
	                <div class="jizhu"><span><input type="checkbox" id="ck_rmbUser"/><a href="javascript:switchCheckbox();">记住用户名</a></span><span class="yy"><a href="#">忘记密码？</a></span></div>
	                <div class="clear"></div>
	                <div class="xiazai"><a href="#">下载安装控件</a></div>
	                <div class="dianji">
	                	<input onclick="return checkform()" src="<%=contextPath%>/web/images/dl.jpg" type="image" />
	                	<a href="javascript:resetform();" class="ye"><img src="<%=contextPath%>/web/images/cz.jpg" width="118" height="32" /></a>
	                </div>
	            </div>
	        </div>
	        <div class="dl_foot">献身信息科技&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;共创美好未来</div>
	    </div>
	</div>
	</form>
	
	<script type="text/javascript" src="<%=contextPath%>/web/js/bui-2.1.1/jquery-1.8.1.min.js"></script>
	<script type="text/javascript" src="<%=contextPath%>/web/js/plugin/jquery.cookie.js"></script>
	<script type="text/javascript">
	<!--
	//登录
	function checkform() {
		var username=$("#userName").val();
		var password=$("#password").val();
		if ($.trim(username).length == 0){
			alert("请输入用户名");
			$("#userName").focus();
			return false;
		}else if ($.trim(password).length == 0){
			alert("请输入密码");
			$("#password").focus();
			return false;
		}else{
			$.ajax({
			    type:"post", //请求方式
			    url:"<%=contextPath%>/login_control.jsp", //发送请求地址
			    data: $("#loginForm").serialize(),
			    dataType:"json",
			    success:function(data){
			    	var message=data[0].message; //登录是否成功
			    	if(message == '0'){ //登录成功
			    		//判断是否正确登录
			    		if("true"==data[1].isLogin){
			    			save();
			    			window.top.location = "<%=contextPath%>/index.jsp";
			    		}	
			    	} else {
			    		$("#userName").focus();
			    		alert("登陆失败，请确保输入的用户名和口令是否正确。");
			    		return false;
			    	}
			    }
			 });
		}
		return false;
	}
	
	//重置表单
	function resetform() {
		$("#loginForm")[0].reset();
	}
	
	//记住用户名密码  
	function save() {  
		if ($("#ck_rmbUser").attr("checked")) {  
			var str_username = $("#userName").val();  
			$.cookie("rmbUser", "true", { expires: 7 }); //存储一个带7天期限的cookie  
			$.cookie("username", str_username, { expires: 7 });  
		}
		else {  
			$.cookie("rmbUser", "false", { expire: -1 });  
			$.cookie("username", "", { expires: -1 });  
		}
	}
	
	//切换checkbox
	function switchCheckbox() {
		if ($("#ck_rmbUser").attr("checked")) {
			$("#ck_rmbUser").attr("checked", false);
		} else {
			$("#ck_rmbUser").attr("checked", true);
		}
	}
	
	//页面初始化
	$(function(){
		if (window.top !== window.self) {
			try {
				top.location = self.location;
			} catch (ex) {
			}
		}
		
		if ($.cookie("rmbUser") == "true") {  
			$("#ck_rmbUser").attr("checked", true);
			$("#userName").val($.cookie("username"));  
		}
	});
	//-->
	</script>
</body>
</html>
