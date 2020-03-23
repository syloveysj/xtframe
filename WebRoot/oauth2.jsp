<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="org.xtframe.entity.User"%>
<%@page import="org.xtframe.entity.ApplicationConfig"%>
<%@page import="org.xtframe.util.StringUtil"%>
<%@page import="org.xtframe.common.DESUtils"%>
<%@page import="org.xtframe.weixin.utils.GOauth2Core"%>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

try {
	String go = StringUtil.toString(request.getParameter("go"), "");
	User user = (User) session.getAttribute(ApplicationConfig.LOGIN_USER);
	if(user != null) {
		System.out.println("当前用户已登录");
		if(!StringUtil.isBlank(go)) {
			String url = DESUtils.decode(go);
			response.sendRedirect(url);
		} else {
%>
<jsp:forward page="/index.jsp"/>
<%
		}
	} else {
		GOauth2Core goauth2Core = new GOauth2Core();
		String get_code_url = goauth2Core.GetCode(go);
		System.out.println("get_code_url=" + get_code_url);
		response.sendRedirect(get_code_url);
	}
} catch(Exception e) {
	System.out.println(e.toString());
}
%>