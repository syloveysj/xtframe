<!DOCTYPE html>
<html>
	<head>
		<title>订单确认 - 希可尔图书</title>
		<#include "controls/header.ftl">
		<script type="text/javascript" src="${model._contextPath}/mobile/resources/js/payfor.js"></script>
		<script type="text/javascript" src="${model._contextPath}/mobile/resources/js/search.js"></script>
		<style>
		.logistics{ border:none; padding:3px}
		</style>
	</head>
	<body>
	<!--头部-->
	<div class="header">
	    <a href="javascript:window.history.back();" class="tbr_rbtn" data-icon="&#xe62a;" title="返回" style="width:auto">支付订单</a>
		    <a href="javascript:void(0);" class="tbr_rbtn" data-icon="&#xe633;" title="搜索" style="right:80px;" id="mySwitch"></a>
			<a href="${model._contextPath}/index.html" class="tbr_rbtn" data-icon="&#xe612;" title="首页" style="right:40px;"></a>
			<a href="${model._contextPath}/p100047.html" class="tbr_rbtn" data-icon="&#xe62f;" title="购物车" style="right:0;"><img src="${model._contextPath}/mobile/resources/img/point.png"></a>
	</div>
	<!--头部 end-->
	
	<#include "controls/header_search.ftl">
	
<#if model.order.order?exists && model.order.order?has_content >
	<div class="ptinfor">
		<p><span>订单号码：</span>${model.order.order.orders_id}</p>
		<p><span>支付金额：</span><span style="color:#c00">￥${model.order.order.total_price}</span></p>
	</div>	
	<hr/>
	
	<form id="js-save-form" method="post" action="${model._contextPath}/weixin/demo/orderPay.html">
		<input type="hidden" name="id" id="id" value="${model.order.order.orders_id}">
		<!--配送信息-->
		<div class="logistics">
			 <h3>配送信息</h3>
		     <div class="ptdate">收货人：</div>
		     <div class="pttxt"><input name="consignee" type="text" id="consignee"  value="${model.order.addr.consignee}" ></div>
		</div>
		<div class="logistics">     
		     <div class="ptdate">电话：</div>
		     <div class="pttxt"><input name="tel" type="text" id="tel"  value="${model.order.addr.tel}" ></div>
		</div>
		<div class="logistics">     
		     <div class="ptdate">地址：</div>
		     <div class="pttxt"><input name="address" type="text" id="address"  value="${model.order.addr.address}" ></div>    	
		</div>
		<div class="logistics">     
		     <div class="ptdate">邮编：</div>
		     <div class="pttxt"><input name="postalcode" type="text" id="postalcode"  value="${model.order.addr.postalcode}" ></div>    	
		</div>
		<!--配送信息 end-->
	</form>
	<hr/>
	<!--支付方式-->
	<div class="logistics">
		<h3>支付方式</h3>
	<!--    <a href="#" title="支付宝"><img src="${model._contextPath}/mobile/resources/img/btn_zfb.png"></a> -->
	    <a id="savePay" href="javascript:void(0);" title="财付通"><img src="${model._contextPath}/mobile/resources/img/btn_cft.png"></a>
	<!--    <a href="#" title="货到付款">货到付款</a> -->
	</div>
	<!--支付方式 end-->
</#if>
	</body>
</html>