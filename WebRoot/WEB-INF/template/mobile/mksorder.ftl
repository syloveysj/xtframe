<!DOCTYPE html>
<html>
	<head>
		<title>结算 - 希可尔图书</title>
		<#include "controls/header.ftl">
		<script type="text/javascript" src="${model._contextPath}/mobile/resources/js/mksorder.js"></script>
		<script type="text/javascript" src="${model._contextPath}/mobile/resources/js/search.js"></script>
		<script type="text/javascript">
			var basePath = "${model._contextPath}";
		</script>
		<style>
		.page_list{ margin-bottom:200px}
		.bg_adds{background:#eb7d0a; color:#fff; width:100%; padding-bottom:10px}
		.bg_adds h4,.bg_adds a{ color:#fff}
		.bg_adds h4 img{margin: 5px 10px 0 0; position: absolute;right: 0;}
		</style>
	</head>
	<body>
		<!--头部-->
		<div class="header">
			<a href="javascript:window.history.back();" class="tbr_rbtn" data-icon="&#xe62a;" title="返回" style="width:auto">确认订单</a>
			<a href="javascript:void(0);" class="tbr_rbtn" data-icon="&#xe633;" title="搜索" style="right:120px;" id="mySwitch"></a>
			<a href="${model._contextPath}/index.html" class="tbr_rbtn" data-icon="&#xe612;" title="首页" style="right:80px;"></a>
			<a href="${model._contextPath}/p100067.html" class="tbr_rbtn" data-icon="&#xe631;" title="个人中心" style="right:40px; font-size:0.85em"></a>
			<a href="${model._contextPath}/p100047.html" class="tbr_rbtn" data-icon="&#xe62f;" title="购物车" style="right:0;"><img src="${model._contextPath}/mobile/resources/img/point.png"></a>
		</div>
		<!--头部 end-->
		
		<#include "controls/header_search.ftl">
		<#assign total=0>
		<!--内容-->
		<div class="page_list" style="margin-top:46px">
			<div class="bg_adds" id="bg_adds">
				<a href="javascript:chooseAddr()">
					<#if model.address?exists && model.address?has_content && (model.address?size>0) >
						<input type="hidden" id="addr_id" value="${model.address.get(0).addr_id}">
						<h4 data-icon="&#xe616;">&nbsp;&nbsp;&nbsp;${model.address.get(0).addr_name}<img width="8" alt="跳转" src="${model._contextPath}/mobile/resources/img/jiao.png"></h4>
						<p>电话：${model.address.get(0).mobile}</p>
						<p>地址：${model.address.get(0).address}</p>
						<p>邮编：${model.address.get(0).postalcode}</p>
					</#if>
		        </a>
			</div>
		    <input type="hidden" id="type" value="${model.cats.type}">
		    <div class="list">
		       <ul>
		       		
		       		<#if model.cats.rows?exists && model.cats.rows?has_content && (model.cats.rows?size>0) >
		       			<#list model.cats.rows as ls>
				       		<li>
				      			<div class="img_wrap"><img src="${model._contextPath}${ls.small_relative_path}" width="80"></div>  
				           		<div class="text_wrap">
				           			<input type="hidden" name="id${ls_index}" code="goods" id="id${ls_index}" value="${ls.goods_id}||${ls.num}">      
				            		<p class="name">${ls.goods_name}</p>
				             		<p class="price"><span class="feed">${ls.goods_author} 著</span></p> 
				             		<p class="price"><span class="feed">* ${ls.num}</span><span class="fr">¥ ${ls.totalprice?default('0')}</span></p> 
				             	</div>
				            </li>
				            <#assign total=total+(ls.totalprice?default(0)?number)>
		            	</#list>
		            </#if>
		       </ul>                          
			</div>
			<div class="ctbg">
		     		<h4 style="text-align:right">
		            	<span class="red">￥
		            	<#if model.cats.yf?exists && model.cats.yf?has_content > ${model.cats.yf}
		            	 	<#assign total=total+(model.cats.yf?default(0)?number)>
		            	 </#if></span>
		            	<a style="color:#111; float:left">运费</a>
		            </h4>
		    </div>
		     <input name="" type="text" class="motxt" placeholder="发票抬头">
		     <input name="" type="text" class="motxt" placeholder="给卖家留言">
		     
		     <div class="page_list ns-page" id="drrs" >
				<div class="ns-box ns-growl ns-effect-scale  ns-show"  id="box">
				<div style="margin-top:1px;"><span style="margin-left:92%;"><a title="删除地址" href="javascript:close();" data-icon="&#xe602;"></a></span></div>
						<div id="box2" class="ns-box2">
							<p>
				<#if model.addr_list?exists && model.addr_list?has_content && (model.addr_list?size>0) >
					<#list model.addr_list as ls>
								<div class="bg_adds_copy" id="aid${ls.addr_id}">
									<a href="javascript:getadrr('${ls.addr_id}','${ls.addr_name}','${ls.consignee}','${ls.mobile}','${ls.address}','${ls.postalcode}')">
									<h4>&nbsp;${ls.addr_name}</h4>
									<p>&nbsp;${ls.consignee}&nbsp;&nbsp;${ls.mobile}</p>
									<p>&nbsp;${ls.address}</p>
									<p>&nbsp;邮编：${ls.postalcode}</p></a>
								</div>
					</#list>
				</#if>
				</p>
						</div>
						</div>
				</div>
		</div><!--内容 end-->
		<div class="toolbar ct_btns">
			<div class="tolprice">合计：￥${total}</div>
		    <a href="javascript:goodsSubmit()" class="buyit" style="float:right; margin-right:5%">确认</a>
		</div>
		
		
	</body>   
</html>