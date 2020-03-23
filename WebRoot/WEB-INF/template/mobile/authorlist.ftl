<#if model.author?exists && model.author?has_content && (model.author?size>0) >
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>${model.author.get(0).author_name} - 希可尔图书</title>
		<#include "controls/header.ftl">
		<script type="text/javascript" src="${model._contextPath}/mobile/resources/js/authorlist.js"></script>
		<script type="text/javascript" src="${model._contextPath}/mobile/resources/js/search.js"></script>
		<link href="${model._contextPath}/web/js/pull-to-refresh/iscroll.css" rel="stylesheet" type="text/css">
		<script type="text/javascript" src="${model._contextPath}/web/js/pull-to-refresh/iscroll.js"></script>
	</head>
	<body id="totop">
		<!--头部--> 
		<div class="header">
			<a href="javascript:window.history.back();" class="tbr_rbtn" data-icon="&#xe62a;" title="返回" style="width:auto">作者相关</a>
			<a href="#" class="tbr_rbtn" data-icon="&#xe61c;" title="收藏" style="right:160px; color:#fff" id="myfavour"></a>
			<a href="javascript:void(0);" class="tbr_rbtn" data-icon="&#xe633;" title="搜索" style="right:120px;" id="mySwitch"></a>
			<a href="${model._contextPath}/index.html" class="tbr_rbtn" data-icon="&#xe612;" title="首页" style="right:80px;"></a>
		    <a href="${model._contextPath}/p100067.html" class="tbr_rbtn" data-icon="&#xe631;" title="个人中心" style="right:40px; font-size:0.85em"></a>
		    <a href="${model._contextPath}/p100047.html" class="tbr_rbtn" data-icon="&#xe62f;" title="购物车" style="right:0;"><img src="${model._contextPath}/mobile/resources/img/point.png"></a>
		</div>
		<!--头部 end-->
		
		<#include "controls/header_search.ftl">
	
		<div class="theauthor">
			<img src="${model._contextPath}${model.author.get(0).small_relative_path?default('')}">
			<p class="atrname">${model.author.get(0).author_name}</p>
			<p>
			<#if model.author.get(0).author_detail?has_content>
				${model.author.get(0).author_detail}
			</#if>
			<input type="hidden" name="id" id="id" value="${model._param.id}">
			</p>
		</div>
		
	<!--内容-->
	<input type="hidden" id="totalcount" value="<#if model.length[0].total?exists && model.length[0].total?has_content >${model.length[0].total}<#else>0</#if>"/>
	<input type="hidden" id="start" value="0"/>
  	<input type="hidden" id="pageSize" value="6"/>
  	<input type="hidden" id="contextPath" value="${model._contextPath}"/>
  	<input type="hidden" name="id" id="id" value="<#if model._param.id?exists && model._param.id?has_content>${model._param.id}</#if>">
		<div id="wrapper">
		<div id="scroller">
		<div class="page_list">
		<div class="list">
			<ul id="thelist">
				<#if model.goods_list?exists && model.goods_list?has_content && (model.goods_list?size>0) >
					<#list model.goods_list as ls>
					<li>
						<a href="${model._contextPath}/p100050.html?id=${ls.goods_id}">  
							<div class="img_wrap"><img src="${model._contextPath}${ls.small_relative_path?default('')}" width="80"></div>  
							<div class="text_wrap"> 
								<p class="name">${ls.goods_name}</p>
								<p class="promo"><#if ls.goods_author?has_content>${ls.goods_author} 著</#if></p>
								<p class="price"><span class="feed"><#if ls.goods_factory?has_content> ${ls.goods_factory} 出版.</#if></span><span class="y_pf">¥ ${ls.goods_price?default('0')} </span></p> 
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
</#if>