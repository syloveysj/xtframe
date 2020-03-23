<!DOCTYPE html>
<html>
	<head>
		<title>个人中心 - 希可尔图书</title>
		<#include "controls/header.ftl">
		<script type="text/javascript" src="${model._contextPath}/mobile/resources/js/address.js"></script>
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
		<#if model.userlist?exists && model.userlist?has_content && (model.userlist?size>0)>
			<div class="usrbg">
				<div class="pn_edit"><a href="${model._contextPath}/p100072.html" data-icon="&#xe624;">编辑</a></div>
				<img src="${model._contextPath}<#if model.userlist[0].photo?has_content>${model.userlist[0].photo}</#if>">
				<#if model.userlist?exists && model.userlist?has_content && (model.userlist?size>0) >
					<div class="pn_name">${model.userlist[0].nickname}</div>
					<div class="pn_infor">${model.userlist[0].remark}</div>
				<#else>
					<div class="pn_name"></div>
					<div class="pn_infor"></div>
				</#if>
			</div>
		</#if>
			<div class="toolbar">
				<ul>
					<li>
						<a href="${model._contextPath}/p100067.html">
							<i><#if model.data_center?exists && model.data_center?has_content  && (model.data_center?size>0)>${model.data_center.get(0).gc}<#else>0</#if></i>
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
						<a href="${model._contextPath}/p100070.html" class="now">
							<i><#if model.data_center?exists && model.data_center?has_content  && (model.data_center?size>0)>${model.data_center.get(0).a}<#else>0</#if></i>
							<p>地址管理</p>
						</a>
					</li>
			
					<li>
						<a href="${model._contextPath}/p100069.html">
							<i><#if model.data_center?exists && model.data_center?has_content  && (model.data_center?size>0)>${model.data_center.get(0).o}<#else>0</#if></i>
							<p>我的订单</p>
						</a>
					</li>
				</ul>
			</div>      
		</div>
        
<div class="page_list">
<#if model.addr_list?exists && model.addr_list?has_content && (model.addr_list?size>0) >
	<#list model.addr_list as ls>
	<div class="bg_adds" id="aid${ls.addr_id}">
		<a href="${model._contextPath}/p100073.html?id=${ls.addr_id}">
		<h4>${ls.addr_name}</h4>
		<p>${ls.consignee}&nbsp;&nbsp;${ls.mobile}</p>
		<p>${ls.address}</p>
		<p>邮编：${ls.postalcode}</p></a>
		<div class="postbg">
			<a title="删除地址" href="javascript:delAddress('${ls.addr_id}');" data-icon="&#xe602;"></a>
			<a title="编辑地址" href="${model._contextPath}/p100073.html?id=${ls.addr_id}" data-icon="&#xe624;"></a>
			<a title="设为默认地址" id="state${ls.addr_id}" href="javascript:defAddress('${ls.addr_id}');" data-icon="&#xe616;" <#if ls.state == 2>class="isok"</#if>></a>
		</div>
	</div>
	</#list>
	<div class="bgtexts" style="background:none"><button onClick="location.href='${model._contextPath}/p100073.html'" type="button" class="release_btn">添加收货地址</button></div>
<#else>
	<div class="add_blank">
    	<i data-icon="&#xe62b;"></i>
    	还没有收货地址呢
   		<a href="${model._contextPath}/p100073.html">添加收货地址</a>
    </div>
</#if>
</div>

		<div class="editfor"><p id="back-to-top"><a href="#totop"><i data-icon="&#xe629;"></i>顶部</a></p></div>
	</body>   
</html>