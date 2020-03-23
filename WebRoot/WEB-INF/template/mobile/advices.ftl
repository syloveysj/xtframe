<!DOCTYPE html>
<html>
	<head>
		<title>设置 - 希可尔图书</title>
		<#include "controls/header.ftl"> 
		<script type="text/javascript" src="${model._contextPath}/mobile/resources/js/search.js"></script>
	</head>
	<body id="totop">
		<!--头部-->
		<div class="header">
			<a href="javascript:window.history.back();" class="tbr_rbtn" data-icon="&#xe62a;" title="返回" style="width:auto">反馈建议</a>
			<a href="${model._contextPath}/p100111.html" class="tbr_rbtn" data-icon="&#xe624;" title="添加" style="right:120px;"></a>
			<a href="${model._contextPath}/index.html" class="tbr_rbtn" data-icon="&#xe612;" title="首页" style="right:80px;"></a>
			<a href="${model._contextPath}/p100067.html" class="tbr_rbtn" data-icon="&#xe631;" title="个人中心" style="right:40px; font-size:0.85em"></a>
			<a href="${model._contextPath}/p100047.html" class="tbr_rbtn" data-icon="&#xe62f;" title="购物车" style="right:0;"><img src="${model._contextPath}/mobile/resources/img/point.png"></a>
		</div>
		<!--头部 end-->	
		
		<#include "controls/header_search.ftl">
		<!--<div class="add_blank" >
    	<i ></i>
   			<a href="${model._contextPath}/p100073.html">添加收货地址</a>
    	</div>-->
		<div class=" mycontainer" style="margin-bottom:50px">
				<#if model.data?exists && model.data?has_content && (model.data?size>0) >
		   	   		<#list model.data as ls>
		   	   			<div class="sex_mng">
			     			<p>${ls.advices_info}</p>
			     			<p>${ls.crtime}</p>
			     		</div>    
		   	   		</#list>
		   	   	</#if>	
		</div>
	</body>
</html>	