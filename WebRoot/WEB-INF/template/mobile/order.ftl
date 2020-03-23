<!DOCTYPE html>
<html>
	<head>
		<title>个人中心 - 希可尔图书</title>
		<#include "controls/header.ftl"> 
		<link href="${model._contextPath}/web/js/pull-to-refresh/iscroll-thors.css" rel="stylesheet" type="text/css">
		<script type="text/javascript" src="${model._contextPath}/mobile/resources/js/order.js"></script>
		<script type="text/javascript" src="${model._contextPath}/web/js/pull-to-refresh/iscroll.js"></script>
	</head>
	<body id="totop" >
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
		<div id="shaed" class="mycontainer">
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
						<a href="${model._contextPath}/p100070.html">
							<i><#if model.data_center?exists && model.data_center?has_content  && (model.data_center?size>0)>${model.data_center.get(0).a}<#else>0</#if></i>
							<p>地址管理</p>
						</a>
					</li>
			
					<li>
						<a href="${model._contextPath}/p100069.html" class="now">
							<i><#if model.data_center?exists && model.data_center?has_content  && (model.data_center?size>0)>${model.data_center.get(0).o}<#else>0</#if></i>
							<p>我的订单</p>
						</a>
					</li>
				</ul>
			</div>      
		</div>
	<input type="hidden" id="totalcount" value="<#if model.data_center?exists && model.data_center?has_content  && (model.data_center?size>0)>${model.data_center.get(0).o}<#else>0</#if>"/>
	<input type="hidden" id="start" value="<#if model.dataRow.start?exists && model.dataRow.start?has_content >${model.dataRow.start}</#if>"/>
	<input type="hidden" id="contextPath" value="${model._contextPath}"/>
	
<#if model.dataRow.rows?exists && model.dataRow.rows?has_content && (model.dataRow.rows?size>0) >
	<div id="wrapper">
	<div id="scroller">
	<#list model.dataRow.rows as ls>
	
	<div id="thelist" class="htls">
	<div class="page_list" id="div4" >
		<div class="odtitle"><h4>订单号：${ls.orders_id}<span>￥${ls.total_price}</span></h4></div>
		<div class="list" id="div1">
      		<ul id="uil">
		<#list ls.order_details as item>
			<li>
				<a href="${model._contextPath}/p100050.html?id=${item.goods_id}">  
					<div class="img_wrap"><img src="${model._contextPath}${item.small_relative_path}" width="80"></div>  
					<div class="text_wrap"> 
						<p class="name">${item.goods_name}</p>
						<p class="promo"><#if item.goods_factory?has_content> ${item.goods_factory} 出版.</#if></p>
						<p class="price"><span class="feed"><#if item.goods_author?has_content>${item.goods_author} 著</#if></span><span class="y_pf">¥ ${item.goods_price} </span></p> 
					</div>
				</a>
			</li>
		</#list>
			</ul>
		</div> 
	</div>
		<#if ls.status?exists && ls.status?has_content && (ls.status?size>0)>
			<#if ls.status=1>
				<div class="mctext odcontrol" id="div2">已下单
					<a href="${model._contextPath}/weixin/demo/orderPay.html?id=${ls.orders_id}">立即支付</a>
				</div>
			<#elseif ls.status=2>
				<div class="mctext odcontrol" id="div2">已支付
					<a href="${model._contextPath}/p100085.html?orders_id=${ls.orders_id}">确认收货</a>
				</div>
			<#elseif ls.status=3>
				<div class="mctext odcontrol" id="div2">已发货
					<#if ls.kdbh?exists && ls.kdbh?has_content && (ls.kdbh?size>0)  && ls.kddh?exists && ls.kddh?has_content && (ls.kddh?size>0)>
						<a href="http://m.kuaidi100.com/index_all.html?type=${ls.kdbh}&postid=${ls.kddh}&callbackurl=http://book.wangbig.com/p100069.html">查看物流</a>
					</#if>
					<a href="${model._contextPath}/p100085.html?orders_id=${ls.orders_id}">确认收货</a>
				</div>
			<#elseif ls.status=4>
				<div class="mctext odcontrol" id="div2">已完成
					<#if ls.kdbh?exists && ls.kdbh?has_content && (ls.kdbh?size>0)  && ls.kddh?exists && ls.kddh?has_content && (ls.kddh?size>0)>
						<a href="http://m.kuaidi100.com/index_all.html?type=${ls.kdbh}&postid=${ls.kddh}&callbackurl=http://book.wangbig.com/p100069.html">查看物流</a>
					</#if>
				</div>
			<#else>
			</#if>
		</#if>
		
	</div>
	<!-----下拉刷新div------>
		
	<!-----下拉刷新div------>
	</#list>
	<div id="pullUp" >
			<span class="pullUpIcon" id="pullUpIcon"></span><span class="pullUpLabel" id="pullUpLabel"></span>
	</div>
	</div>	
	</div>
	
</#if>

		<div class="editfor"><p id="back-to-top"><a href="#totop"><i data-icon="&#xe629;"></i>顶部</a></p></div>
	</body>   
</html>