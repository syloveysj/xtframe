<!DOCTYPE html>
<html>
	<head>
		<title>作者 - 希可尔图书</title>
		<#include "controls/header.ftl">
		<link href="${model._contextPath}/web/js/pull-to-refresh/iscroll-thors.css" rel="stylesheet" type="text/css">
		<script type="text/javascript" src="${model._contextPath}/mobile/resources/js/author.js"></script>
		<script type="text/javascript" src="${model._contextPath}/web/js/pull-to-refresh/iscroll.js"></script>
	</head>
	<body id="totop">
		<!--头部--> 
		<div class="header" id="headerid">
			<a href="javascript:window.history.back();" class="tbr_rbtn" data-icon="&#xe62a;" title="返回" style="width:auto">作者列表</a>
			<a href="javascript:void(0);" class="tbr_rbtn" data-icon="&#xe633;" title="搜索" style="right:120px;" id="mySwitch"></a>
			<a href="${model._contextPath}/index.html" class="tbr_rbtn" data-icon="&#xe612;" title="首页" style="right:80px;"></a>
			<a href="${model._contextPath}/p100067.html" class="tbr_rbtn" data-icon="&#xe631;" title="个人中心" style="right:40px; font-size:0.85em"></a>
			<a href="${model._contextPath}/p100047.html" class="tbr_rbtn" data-icon="&#xe62f;" title="购物车" style="right:0;"><img src="${model._contextPath}/mobile/resources/img/point.png"></a>
		</div>
		<!--头部 end-->
		
		<#include "controls/author_search.ftl">
		
		<div id="conDiv" class="hvs">
			 <input type="hidden" id="totalcount" value="${model.authorsCun.get(0).totalcount}"/>
			 <input type="hidden" id="start" value="${model.authorsCun.get(0).start}"/>
  			 <input type="hidden" id="contextPath" value="${model._contextPath}"/>
  			 <input type="hidden" id="authorHid" value="${model._param.author?default('')}"/>
			 <div id="wrapper">
			 <div id="scroller">
			 <div class="fav_list" id="fav_list_id">
			 		<ul id="thelist">
			 			<#if model.authors?exists && model.authors?has_content && (model.authors?size>0) >
			 			<#list model.authors as ls>
			 				<li><a href="${model._contextPath}/p100066.html?id=${ls.author_id}&start=0&size=10" name="top${ls_index}"><img src="${model._contextPath}${ls.small_relative_path?default('')}"><h3>${ls.author_name}</h3></a></li>
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
		<div class="editfor"><p id="back-to-top"><a href="#totop"><i data-icon="&#xe629;"></i>顶部</a></p></div>
		
	</body>
</html>