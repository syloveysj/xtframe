
<!DOCTYPE html>
<html lang="en">
	<head>
		<title> 希可尔图书</title>
		<#include "controls/header.ftl">
		<script type="text/javascript" src="${model._contextPath}/mobile/resources/js/authorlist.js"></script>
		<script type="text/javascript" src="${model._contextPath}/mobile/resources/js/search.js"></script>
		<link href="${model._contextPath}/web/js/pull-to-refresh/iscroll.css" rel="stylesheet" type="text/css">
		<script type="text/javascript" src="${model._contextPath}/web/js/pull-to-refresh/iscroll.js"></script>
		<script type="text/javascript" src="${model._contextPath}/mobile/resources/js/tuanbook.js"></script>
	</head>
	<body id="totop">
		<!--头部--> 
		<div class="header">
			<a href="javascript:window.history.back();" class="tbr_rbtn" data-icon="&#xe62a;" title="返回" style="width:auto">特卖书籍</a>
			<a href="javascript:void(0);" class="tbr_rbtn" data-icon="&#xe633;" title="搜索" style="right:120px;" id="mySwitch"></a>
			<a href="${model._contextPath}/index.html" class="tbr_rbtn" data-icon="&#xe612;" title="首页" style="right:80px;"></a>
		    <a href="${model._contextPath}/p100067.html" class="tbr_rbtn" data-icon="&#xe631;" title="个人中心" style="right:40px; font-size:0.85em"></a>
		    <a href="${model._contextPath}/p100047.html" class="tbr_rbtn" data-icon="&#xe62f;" title="购物车" style="right:0;"><img src="${model._contextPath}/mobile/resources/img/point.png"></a>
		</div>
		<!--头部 end-->
		
		<#include "controls/header_search.ftl">
	<div>
		<p></p><span></span>
	</div>
	<!--内容-->
	<input type="hidden" id="totalcount" value="${model.tbooktot[0].totalcount}"/>
	<input type="hidden" id="start" value="${model.tbooktot[0].start}"/>
  	<input type="hidden" id="pageSize" value="6"/>
  	<input type="hidden" id="contextPath" value="${model._contextPath}"/>
<#if model.tbooklist?exists && model.tbooklist?has_content && (model.tbooklist?size>0) >
		<div id="wrapper">
		<div id="scroller">
		<!--author--> 
		<div class="bookkinds" >
		<div style="height:46px">&nbsp;</div>
			<div class="fav_list">
			<ul id="thelist">
				<#list model.tbooklist as ls>
					<li  style="height:auto">
						<a href="${model._contextPath}/p100050.html?id=${ls.goods_id}" >
		                	<img src="${model._contextPath}${ls.small_relative_path?default('')}" style="border-radius:0">
							<div class="txtall">
								<h4 class="titlegreen"><#if ls.goods_name?has_content && (ls.goods_name?length>16)>${ls.goods_name[0..16]}..<#elseif ls.goods_name?has_content && (ls.goods_name?length<=16)>${ls.goods_name}</#if></h4>
								<p class="price">￥<#if ls.goods_price?has_content>${ls.goods_price}<#else>0</#if></p>
								<p class="poortxt">
									<#if ls.goods_author?has_content>${ls.goods_author} 著.</#if>
									<#if ls.goods_factory?has_content> ${ls.goods_factory} 出版.</#if>
								</p>
							</div>
		                </a>
					</li>
				</#list>
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
		<!--author end-->
</#if>
	<!--内容 end-->
	
	<div class="editfor"><p id="back-to-top"><a href="#totop"><i data-icon="&#xe629;"></i>顶部</a></p></div>
	
	</body>   
</html>
