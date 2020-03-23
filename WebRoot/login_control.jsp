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
String username = request.getParameter("userName");
String pwd = request.getParameter("password") != null ? request.getParameter("password") : "";

Application app = ContextUtil.getApplication();
User user = new User(app);
if (user.init(username, EncryptCount.encryptMD5(pwd))) {
	session.removeAttribute(ApplicationConfig.LOGIN_USER);
	session.setAttribute(ApplicationConfig.LOGIN_USER, user);
	response.getWriter().write("[{\"message\":\"0\"},{\"isLogin\":\"true\"},{\"userName\":\""+username+"\"},{\"password\":\""+pwd+"\"}]"); //验证成功
} else {
	response.getWriter().write("[{\"message\":\"1\"},{\"isLogin\":\"false\"},{\"userName\":\""+username+"\"},{\"password\":\""+pwd+"\"}]");
}
%>