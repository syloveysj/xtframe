<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="org.xtframe.entity.User"%>
<%@page import="org.xtframe.entity.ApplicationConfig"%>
<%@page import="org.xtframe.util.StringUtil"%>
<%@page import="org.xtframe.common.DESUtils"%>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

try {
	String go = request.getParameter("go");
	User user = (User) session.getAttribute(ApplicationConfig.LOGIN_USER);
	if(user != null) {
		if(!StringUtil.isBlank(go)) {
			String url = DESUtils.decode(go);
			response.sendRedirect(url);
		} else {
			if("admin".equals(user.getUserInfo().getUserName())) {
				response.sendRedirect("/work/app/index.jsp");
			} else {
%>
<jsp:forward page="/index.html"/>
<%
			}
		}
	}
} catch(Exception e) {
	response.sendRedirect("/p100041.html");
}
%>
