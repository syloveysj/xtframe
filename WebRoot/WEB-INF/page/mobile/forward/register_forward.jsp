<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.util.*"%>
<%@page import="java.net.*"%>
<%@page import="org.xtframe.weixin.service.impl.LoginServiceImpl"%>

<%
//String basePath = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+request.getContextPath();
Map<String, Object> model = (Map<String, Object>)request.getAttribute("model");
Map<String, Object> param = (Map<String, Object>)model.get("_param");
int[] user_register = (int[]) model.get("user_register");
String openid = param.get("openid").toString();
System.out.println(user_register);
%>
<!DOCTYPE html> 
<html>
	<head>
		<title>注册信息</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="<%=model.get("_contextPath")%>/mobile/resources/lib/jquery.mobile/jquery.mobile-1.4.1.min.css" type="text/css">
	</head>
	<body>
		<div data-role="page">
			<div data-role="content">
<%
if(user_register.length>1 && user_register[0]>0 && user_register[1]>0) {
	//关联系统用户登录
	LoginServiceImpl.exec(openid);
	response.sendRedirect("/p100039.html");
	//response.sendRedirect("/weixin/demo/pay.html");
%>
	<a href="<%=basePath + "/p100039.html"%>" data-role="button">注册成功， 跳转首页</a>
<%
} else {
	response.sendRedirect("/p100040.html");
%>
	<a href="<%=basePath + "/p100040.html?wx=" + openid%>" data-role="button">注册失败， 重新注册</a>
<%
}
%>  
			</div>
		</div>
		
		<script type="text/javascript" src="<%=model.get("_contextPath")%>/mobile/resources/lib/jquery/jquery-1.11.0.min.js"></script>
	  	<script type="text/javascript" src="<%=model.get("_contextPath")%>/mobile/resources/lib/jquery.mobile/jquery.mobile-1.4.1.min.js"></script>
	</body>
</html>