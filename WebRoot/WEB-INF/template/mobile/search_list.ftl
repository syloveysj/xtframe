<!DOCTYPE html>
<html>
	<head>
		<title>图书列表 - 希可尔图书</title>
		<#include "controls/header.ftl">
		<link href="${model._contextPath}/web/js/pull-to-refresh/iscroll.css" rel="stylesheet" type="text/css">
		<script type="text/javascript" src="${model._contextPath}/mobile/resources/js/goods_list.js"></script>
		<script type="text/javascript" src="${model._contextPath}/web/js/pull-to-refresh/iscroll.js"></script>
		<script type="text/javascript" src="${model._contextPath}/mobile/resources/js/search.js"></script>
	</head>
	<body id="totop">
		<!--头部--> 
		<div class="header">
			<a href="javascript:window.history.back();" class="tbr_rbtn" data-icon="&#xe62a;" title="返回" style="width:auto">图书列表</a>
			<a href="javascript:void(0);" class="tbr_rbtn" data-icon="&#xe633;" title="搜索" style="right:120px;" id="mySwitch"></a>
			<a href="${model._contextPath}/index.html" class="tbr_rbtn" data-icon="&#xe612;" title="首页" style="right:80px;"></a>
			<a href="${model._contextPath}/p100067.html" class="tbr_rbtn" data-icon="&#xe631;" title="个人中心" style="right:40px; font-size:0.85em"></a>
			<a href="${model._contextPath}/p100047.html" class="tbr_rbtn" data-icon="&#xe62f;" title="购物车" style="right:0;"><img src="${model._contextPath}/mobile/resources/img/point.png"></a>
		</div><!--头部 end-->
		
		<#include "controls/header_search.ftl">
		
<#if model._param.sortname?exists && model._param.sortname?has_content>
	<#assign sortname=model._param.sortname>
<#else>
	<#assign sortname="recommend">
</#if>
<#if model._param.sortorder?exists && model._param.sortorder?has_content>
	<#assign sortorder=model._param.sortorder>
<#else>
	<#assign sortorder="desc">
</#if>
<#if model._param.cls?exists && model._param.cls?has_content>
	<#assign cls="&cls="+model._param.cls>
<#else>
	<#assign cls="">
</#if>
		
		
		<input type="hidden" id="totalcount" value="<#if model.data.total?exists && model.data.total?has_content>${model.data.total}</#if>"/>
		<input type="hidden" id="start" value="<#if model.data.start?exists && model.data.start?has_content>${model.data.start}</#if>"/>
  		<input type="hidden" id="contextPath" value="${model._contextPath}"/>
  		<input type="hidden" id="cls" value="<#if model._param.cls?exists && model._param.cls?has_content>${(model._param.cls)?default('')}</#if>"/>
		<!--内容-->
		<div id="wrapper">
		<div id="scroller">
		<div class="page_list" style="margin-top:40px">
		   <div class="list">
		       	<ul id="thelist">
				<#if model.data.rows?exists && model.data.rows?has_content && (model.data.rows?size>0) >
					<#list model.data.rows as ls>
					<li>
						<a href="${model._contextPath}/p100050.html?id=${ls.goods_id}">  
						  	<div class="img_wrap"><img src="${model._contextPath}${(ls.small_relative_path)?default('')}" width="80"></div>
							<div class="text_wrap"> 
								<p class="name"><#if ls.goods_name?has_content>${ls.goods_name}</#if></p>
								<p class="promo"><#if ls.goods_author?has_content>${ls.goods_author} 著</#if></p>
								<p class="price"><span class="feed"><#if ls.goods_factory?has_content> ${ls.goods_factory} </#if>出版.</span></p> 
							</div>
						</a>
					</li>
					</#list>
				</#if>
		   	 </ul>
		   	 	<!-----下拉刷新div------>
					<div id="pullUp">
						<span class="pullUpIcon" id="pullUpIcon"></span><span class="pullUpLabel"  id="pullUpLabel"></span>
					</div>
				<!-----下拉刷新div------>
		   </div>
		</div>
		</div>
		</div>
		<!--内容 end-->
	
		<div class="editfor"><p id="back-to-top"><a href="#totop"><i data-icon="&#xe629;"></i>顶部</a></p></div>
	
	</body>   
</html>