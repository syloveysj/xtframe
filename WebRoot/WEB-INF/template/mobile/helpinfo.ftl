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
			<a href="javascript:window.history.back();" class="tbr_rbtn" data-icon="&#xe62a;" title="返回" style="width:auto">帮助信息</a>
			<a href="${model._contextPath}/index.html" class="tbr_rbtn" data-icon="&#xe612;" title="首页" style="right:80px;"></a>
			<a href="${model._contextPath}/p100067.html" class="tbr_rbtn" data-icon="&#xe631;" title="个人中心" style="right:40px; font-size:0.85em"></a>
			<a href="${model._contextPath}/p100047.html" class="tbr_rbtn" data-icon="&#xe62f;" title="购物车" style="right:0;"><img src="${model._contextPath}/mobile/resources/img/point.png"></a>
		</div>
		<!--头部 end-->
		
		<#include "controls/header_search.ftl">
		
		<div class=" mycontainer" style="margin-bottom:50px">
			 <#if model.datainfo?exists && model.datainfo?has_content && (model.datainfo?size>0) >
			     <div class="sex_mng"><h4>标题：${model.datainfo.get(0).title}</h4>
			     	<p>${model.datainfo.get(0).content}
			        </p>
			     </div>     
		     </#if>
		</div>
		<div class="editfor">
			<p id="back-to-top"><a href="#totop"><i data-icon="&#xe629;"></i>顶部</a></p>
		</div>
	</body>
</html>