<!DOCTYPE html>
<html>
	<head>
		<title>购物车 - 希可尔图书</title>
		<#include "controls/header.ftl">
		<script type="text/javascript">
			var basePath = "${model._contextPath}";
		</script>
		<script type="text/javascript" src="${model._contextPath}/mobile/resources/js/cart.js"></script>
		<script type="text/javascript" src="${model._contextPath}/mobile/resources/js/search.js"></script>
	</head>
<body>
	<!--头部--> 
	<div class="header">
		<a href="javascript:window.history.back();" class="tbr_rbtn" data-icon="&#xe62a;" title="返回" style="width:auto">购物车</a>
		<a href="javascript:void(0);" class="tbr_rbtn" data-icon="&#xe633;" title="搜索" style="right:80px;" id="mySwitch"></a>
		<a href="${model._contextPath}/index.html" class="tbr_rbtn" data-icon="&#xe612;" title="首页" style="right:40px;"></a>
		<a href="${model._contextPath}/p100067.html" class="tbr_rbtn" data-icon="&#xe631;" title="个人中心" style="right:0; font-size:0.85em"></a>
	</div>
	<!--头部 end-->
	
	<#include "controls/header_search.ftl">
	
	<!--内容-->
	<div class="page_list" style="margin-top:46px">
		<div class="list">
			<ul>
<#assign total=0>
<#assign sum=0>
<#if model.goods_list?exists && model.goods_list?has_content && (model.goods_list?size>0) >
	<#list model.goods_list as ls>
	<li code="gid${ls.goods_id}">
		<a href="javascript:delGoods('${ls.goods_id}');" data-icon="&#xe602;" class="a_del"></a>
		<div class="ctrlcart">
			<a href="javascript:lessNum('vnum${ls_index}', '${ls.goods_id}');" data-icon="&#xe636;" class="a_ctrlnum"></a>
			<input id="vnum${ls_index}" code="vnum" name="vnum${ls_index}" type="number" min="1" max="99" value="${ls.num}" readonly="readonly">
			<input type="hidden" name="id${ls_index}" code="id" id="id${ls_index}" value="${ls.goods_id}">
			<input type="hidden" name="price${ls_index}" code="price" id="price${ls_index}" value="${ls.goods_price?default('0')}">
			<a href="javascript:addNum('vnum${ls_index}', '${ls.goods_id}');" data-icon="&#xe637;" class="a_ctrlnum"></a>
 		</div>
 		<a href="${model._contextPath}/p100050.html?id=${ls.goods_id}">
			<div class="img_wrap">
				<label style="color:#999; float:left">
					<input name="sel${ls_index}" code="sel" type="checkbox" value="${ls.goods_id}" onclick="selectOne()">
				</label>
				<img src="${model._contextPath}${ls.small_relative_path}" width="80">
			</div>  
			<div class="text_wrap"> 
				<p class="name">${ls.goods_name}</p>
				<p class="price"><span class="feed"><#if ls.goods_author?has_content>${ls.goods_author} 著</#if></span></p> 
				<p class="red">¥ ${ls.goods_price?default('0')}&nbsp;&nbsp;<span class="huis">￥${ls.goods_old_price?default('0')}</span></p>
			</div>
		</a>
	</li>
	<#assign total=total+(ls.goods_price?default(0)?number)*(ls.num?number)>
	<#assign sum=sum+(ls.num?number)>
	</#list>
</#if>
			</ul>
		</div>
		<div class="ctbg">
     		<h4 style="text-align:right">
            	<span class="huis" style="text-decoration:none" id="sum">共 ${sum} 册</span>
                &nbsp;合计：
                <span class="red" id="total">￥${total}</span>
            	<label style="color:#999; float:left">
					<input name="controlAll" type="checkbox" value="" onclick="selectAll()" id="controlAll"> 全选
            		&nbsp;&nbsp;&nbsp;<a href="javascript:clearCart();" style="color:#999;">清空</a>
				</label>
            </h4>
		</div>
	</div>
	<!--内容 end-->

	<div class="toolbar ct_btns">
		<a href="javascript:settleAccounts();" class="midone" style="margin:0; width:95%">结算订单</a>
	</div>
</body>   
</html>