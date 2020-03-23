<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.util.*"%>
<%@page import="java.net.*"%>
<%@page import="org.xtframe.util.ContextUtil"%>
<%@page import="org.xtframe.entity.Application"%>
<%@page import="org.xtframe.entity.ApplicationConfig"%>
<%@page import="org.xtframe.entity.User"%>
<%@page import="org.xtframe.common.EncryptCount"%>
<%@page import="org.xtframe.util.ApplicationConfigUtil"%>
<%
String basePath = request.getContextPath();
Map<String, Object> model = (Map<String, Object>)request.getAttribute("model");
Map<String, Object> param = (Map<String, Object>)model.get("_param");

Application app = ContextUtil.getApplication();
String username = param.get("username").toString();
String pwd = param.containsKey("pwd") ? param.get("pwd").toString() : "";
User user = new User(app);
if (user.init(username, EncryptCount.encryptMD5(pwd))) {
	session.removeAttribute(ApplicationConfig.LOGIN_USER);
	session.setAttribute(ApplicationConfig.LOGIN_USER, user);
	response.setHeader("refresh","0;url=" + basePath + "/p101057.html");
} else {
	String info = URLEncoder.encode("您的该帐号或密码错误,请重新登录。", "utf-8");
	response.setHeader("refresh","0;url=" + basePath + "/p101055.html?username=" + URLEncoder.encode(username, "utf-8") + "&info=" + info);
}
%>