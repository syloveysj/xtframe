<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.util.*"%>
<%@page import="java.net.*"%>
<%@page import="org.xtframe.entity.ApplicationConfig"%>
<%@page import="org.xtframe.common.URLConnectionHelper"%>
<%@page import="org.xtframe.weixin.service.impl.LoginServiceImpl"%>
<%@page import="net.minidev.json.JSONValue"%>
<%@page import="net.minidev.json.JSONObject"%>
<%
String basePath = request.getContextPath();
String code = request.getParameter("code");
String data = URLConnectionHelper.sendGet("https://api.weixin.qq.com/sns/oauth2/access_token","appid=wxeaaf3ca34f2984f7&secret=194d01191e1329305eb50565a601fe97&code="+code+"&grant_type=authorization_code");
if(data != null) {
	Object obj = JSONValue.parseStrict(data);
	JSONObject jsonobj = (JSONObject)obj;
	String openid = jsonobj.containsKey("openid") ? jsonobj.get("openid").toString() : "";
	
	System.out.println("openid="+openid);
	System.out.println("code="+code);
	System.out.println("data="+data);
	
	//关联系统用户登录
	LoginServiceImpl.exec(openid);
	Object user = session.getAttribute(ApplicationConfig.LOGIN_USER);
	if(user == null) {
		// 跳转到注册页面
		response.setHeader("refresh","0;url=" + basePath + "/p100040.html?wx=" + openid);
	} else {
		// 跳转到首页
		response.setHeader("refresh","0;url=" + basePath + "/p100039.html");
		//response.setHeader("refresh","0;url=" + basePath + "/weixin/demo/pay.html");
	}
}
%>