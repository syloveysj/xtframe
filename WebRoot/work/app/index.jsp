<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		<title>XTFrame管理系统</title>
		<link rel="stylesheet" type="text/css" href="<%=path%>/work/resources/js-lib/ext-4.2.1/resources/css/ext-all.css"/>
		<link rel="stylesheet" type="text/css" href="<%=path%>/work/resources/images/xtframe.css" />
		<script type="text/javascript" src="<%=path%>/work/resources/js-lib/ext-4.2.1/ext-all-debug.js"></script>
		<script type="text/javascript" src="<%=path%>/work/resources/js-lib/ext-4.2.1/locale/ext-lang-zh_CN.js"></script>
		<script type="text/javascript" src="<%=path%>/work/app/util/plugin.js"></script>
		<script type="text/javascript" src="<%=path%>/work/app/util/AjaxUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/work/app/util/ViewFactory.js"></script>
		<script type="text/javascript" src="<%=path%>/work/app/util/pubopt.js"></script>
		<script type="text/javascript" src="<%=path%>/work/app/util/custom.js"></script>
		<script type="text/javascript" src="<%=path%>/work/app/util/config.js"></script>
		<script type="text/javascript">
		Ext.Loader.setConfig( {
			enabled : true
		});
		Ext.application( {
			name : 'XTFrame',//应用的名字
			appFolder : '<%=path%>/work/app',//应用的目录
			launch:function(){//当前页面加载完执行的函数
				Ext.QuickTips.init();
			},
			controllers : [ 'Main', 'CRUD', 'File', 'Task' ]
		});
		</script>
	</head>
	<body>
	</body>
</html>