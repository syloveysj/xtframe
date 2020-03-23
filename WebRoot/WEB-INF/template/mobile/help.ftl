<!DOCTYPE html>
<html>
	<head>
		<title>帮助中心 - 希可尔图书</title>
		<#include "controls/header.ftl">
		<script type="text/javascript" src="${model._contextPath}/mobile/resources/js/search.js"></script>
	</head>
	<body>
		<!--头部-->
		<div class="header">
			<a href="javascript:window.history.back();" class="tbr_rbtn" data-icon="&#xe62a;" title="返回" style="width:auto">帮助中心</a>
			<a href="javascript:void(0);" class="tbr_rbtn" data-icon="&#xe633;" title="搜索" style="right:120px;" id="mySwitch"></a>
			<a href="${model._contextPath}/index.html" class="tbr_rbtn" data-icon="&#xe612;" title="首页" style="right:80px;"></a>
			<a href="${model._contextPath}/p100067.html" class="tbr_rbtn" data-icon="&#xe631;" title="个人中心" style="right:40px; font-size:0.85em"></a>
			<a href="${model._contextPath}/p100047.html" class="tbr_rbtn" data-icon="&#xe62f;" title="购物车" style="right:0;"><img src="${model._contextPath}/mobile/resources/img/point.png"></a>
		</div>
		<!--头部 end-->
		
		<#include "controls/header_search.ftl">
		
		<div class="topNews">
			<ul>
				<#if model.data?exists && model.data?has_content && (model.data?size>0) >
		   	   		<#list model.data as ls>
		   	   			<li><a href="${model._contextPath}/p100109.html?id=${ls.id}">${ls.title}</a></li>
		   	   		</#list>
		   	   	</#if>	
			</ul>
		</div>
	</body>
</html>