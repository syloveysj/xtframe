<!DOCTYPE html>
<html>
	<head>
		<title>个人中心 - 希可尔图书</title>
		<#include "controls/header.ftl"> 
		<script type="text/javascript" src="${model._contextPath}/mobile/resources/js/mine.js"></script>
		<script type="text/javascript" src="${model._contextPath}/mobile/resources/js/search.js"></script>
	</head>
	<body id="totop">
		<!--头部-->
		<div class="header">
			<a href="javascript:window.history.back();" class="tbr_rbtn" data-icon="&#xe62a;" title="返回" style="width:auto">个人中心</a>
			<a href="${model._contextPath}/p100071.html" class="tbr_rbtn" data-icon="&#xe621;" title="设置" style="right:120px;"></a>
		    <a href="javascript:void(0);" class="tbr_rbtn" data-icon="&#xe633;" title="搜索" style="right:80px;" id="mySwitch"></a>
			<a href="${model._contextPath}/index.html" class="tbr_rbtn" data-icon="&#xe612;" title="首页" style="right:40px;"></a>
			<a href="${model._contextPath}/p100047.html" class="tbr_rbtn" data-icon="&#xe62f;" title="购物车" style="right:0;"><img src="${model._contextPath}/mobile/resources/img/point.png"></a>
		</div>
		<!--头部 end-->
		
		<#include "controls/header_search.ftl">
		
		<!--内容-->
		<div class="mycontainer">
			<div class="usrbg">
				<div class="pn_edit"><a href="${model._contextPath}/p100072.html" data-icon="&#xe624;">编辑</a></div>
				<img src="${model._contextPath}${(model.userlist[0].photo)?default('')}">
				<#if model.userlist?exists && model.userlist?has_content && (model.userlist?size>0) >
					<div class="pn_name">${model.userlist[0].nickname}</div>
					<div class="pn_infor">${model.userlist[0].remark}</div>
				<#else>
					<div class="pn_name"></div>
					<div class="pn_infor"></div>
				</#if>
			</div>
			<div class="toolbar">
				<ul>
					<li>
						<a href="${model._contextPath}/p100067.html" class="now">
							<i><span id="g_count"><#if model.data_center?exists && model.data_center?has_content  && (model.data_center?size>0)>${model.data_center.get(0).gc}<#else>0</#if></span></i>
							<p>书籍收藏</p>
						</a>
					</li>
			
					<li>
						<a href="${model._contextPath}/p100068.html">
							<i><#if model.data_center?exists && model.data_center?has_content  && (model.data_center?size>0)>${model.data_center.get(0).ac}<#else>0</#if></i>
							<p>作者收藏</p>
						</a>
					</li>
			
					<li>
						<a href="${model._contextPath}/p100070.html">
							<i><#if model.data_center?exists && model.data_center?has_content  && (model.data_center?size>0)>${model.data_center.get(0).a}<#else>0</#if></i>
							<p>地址管理</p>
						</a>
					</li>
			
					<li>
						<a href="${model._contextPath}/p100069.html?start=0&size=4">
							<i><#if model.data_center?exists && model.data_center?has_content  && (model.data_center?size>0)>${model.data_center.get(0).o}<#else>0</#if></i>
							<p>我的订单</p>
						</a>
					</li>
				</ul>
			</div>      
		</div>
		    
		<!--booklove-->
		<div class="mglist">
<#if model.goods_list?exists && model.goods_list?has_content && (model.goods_list?size>0) >
	<#list model.goods_list as ls>
	<div id="gid${ls.goods_id}">
    	<i data-icon="&#xe602;" class="delbk" onclick="delGoods('${ls.goods_id}')"></i>
    	<a href="${model._contextPath}/p100050.html?id=${ls.goods_id}">
        <p><img src="${model._contextPath}${ls.small_relative_path?default('')}" alt="${ls.goods_name}"></p>  
        <p class="name">${ls.goods_name}</p>  
        <p class="price">￥${ls.goods_price?default('0')}<span class="rmb">￥${ls.goods_old_price?default('0')}</span></p>
        <a>
    </div>
	</#list>
</#if>
		</div>
		<!--booklove end-->
		        
		<div class="editfor"><p id="back-to-top"><a href="#totop"><i data-icon="&#xe629;"></i>顶部</a></p></div>
	</body>   
</html>