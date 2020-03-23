<!DOCTYPE HTML>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>XTFrame平台 V1.0</title>
		<link href="${model._contextPath}/web/css/common.css" rel="stylesheet" type="text/css" />
		<link href="${model._contextPath}/web/css/main.css" rel="stylesheet" type="text/css" />
		<link href="${model._contextPath}/web/js/bui-2.1.1/css/dpl-min.css" rel="stylesheet" type="text/css" />
		<link href="${model._contextPath}/web/js/bui-2.1.1/css/bui-min.css" rel="stylesheet" type="text/css" />
	</head>

	<body>
	<!-- 顶部 -->
	<div class="topbg">
	   <div class="top_left">
	   	   <div class="logo">XTFrame平台 V1.0</div>
	   </div>
	   <div class="top_right">
	       <span>
	       <#if stack.context["session"][stack.findValue("@org.xtframe.entity.ApplicationConfig@LOGIN_USER")]?exists>
	   ${stack.context["session"][stack.findValue("@org.xtframe.entity.ApplicationConfig@LOGIN_USER")].userInfo.realName} [${stack.context["session"][stack.findValue("@org.xtframe.entity.ApplicationConfig@LOGIN_USER")].userInfo.userName}] 您好，欢迎登录！
	       <#else>
	       您尚未<a href="${model._contextPath}/login.jsp" style="color:red">登录</a>！
	       </#if>
	       </span>
	       <span><a href="javascript:void(0);"><img src="${model._contextPath}/web/images/you01.png" width="26" height="26" /></a>
	       <a href="javascript:void(0);"><img src="${model._contextPath}/web/images/you02.png" width="28" height="26" /></a>
	       <a href="javascript:logout();"><img src="${model._contextPath}/web/images/you03.png" width="26" height="26" /></a>
	       <a href="javascript:void(0);"><img src="${model._contextPath}/web/images/you04.png" width="26" height="26" /></a></span>
	   </div>
	</div>
	<div class="clear"></div>
	
	<!-- 内容 -->
	<div class="content">
		<div class="dl-main-nav">
			<div class="dl-inform"><div class="dl-inform-title">贴心小秘书<s class="dl-inform-icon dl-up"></s></div></div>
			<div class="shouye"></div>
			<ul id="J_Nav"  class="nav-list ks-clear">
				<li class="nav-item dl-selected"><div class="nav-item-inner nav-home">首　　页</div></li>
<#if model.info?exists && model.info.modules?exists && model.info.modules?has_content && (model.info.modules?size>0) >
	<#list model.info.modules as ls>
		<li class="nav-item"><div class="nav-item-inner nav-order">${ls.moduleName}</div></li>
	</#list>
</#if>
			</ul>
			<div class="weiba"><img src="${model._contextPath}/web/images/weiba.jpg" width="10" height="39" /></div>
		</div>
		<ul id="J_NavContent" class="dl-tab-conten" >
		</ul>
	</div>
	
	<!-- 底部 -->
	<div class="foot">献身信息科技&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;共创美好未来</div>
	
	<!-- 脚本 -->
	<script type="text/javascript" src="${model._contextPath}/web/js/bui-2.1.1/jquery-1.8.1.min.js"></script>
	<script type="text/javascript" src="${model._contextPath}/web/js/bui-2.1.1/bui.js"></script>
	<script type="text/javascript" src="${model._contextPath}/web/js/plugin/ajaxutil.js"></script>
	<script type="text/javascript" src="${model._contextPath}/web/frame/js/config.js"></script>
	
	<script>
	var contextPath = "${model._contextPath}",
		__pageTempIndex = 111,
		__appBasePathse = "${model._contextPath}";
		
	BUI.use('common/main',function(){
		<#if model.info?exists>
		var config = ${model.info.config};
		<#else>
		var config = [];
		</#if>
		
		config.unshift({
			id:'home', 
			homePage : 'indexHome',
			menu:[{
				text:'首页内容',
				items:[
					{id:'indexHome',text:'首　　页',href:'${model._contextPath}/p101058.html',closeable : false}
				]
			}]
		});
		
		new PageUtil.MainPage({
			modulesConfig : config
		});
	});
	
	function logout() {
		var msg = "^_^温馨提示：离开系统前请保存已操作的数据";
		if(confirm(msg)){
		    parent.location='${model._contextPath}/logout.jsp';
	    }
	}
	</script>
	</body>
</html>