<!DOCTYPE html>
<html>
	<head>
		<title>个人中心 - 希可尔图书</title>
		<#include "controls/header.ftl">
		<script type="text/javascript">
			var basePath = "${model._contextPath}";
		</script>
		<script type="text/javascript" src="${model._contextPath}/mobile/resources/js/address_edit.js"></script>
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
				<img src="${model._contextPath}${model.userlist[0].photo}">
				<#if model.userlist?exists && model.userlist?has_content && (model.userlist?size>0) >
					<div class="pn_name"><#if model.userlist[0].nickname?has_content>${model.userlist[0].nickname}</#if></div>
					<div class="pn_infor"><#if model.userlist[0].remark?has_content>${model.userlist[0].remark}</#if></div>
				<#else>
					<div class="pn_name"></div>
					<div class="pn_infor"></div>
				</#if>
			</div>
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
			<div class="contactus">
				<input type="hidden" name="id" id="id" value="<#if model._param.id?exists && model._param.id?has_content>${model._param.id}</#if>">
				<div class="bgtexts"><input name="addr_name" id="addr_name" type="text" maxlength="25" placeholder="设置一个易记的名字，如“送到公司”“家”"></div>
				<div class="bgtexts"><input name="consignee" id="consignee" type="text" maxlength="10" placeholder="收货人姓名"></div>
				<div class="bgtexts"><input name="mobile" id="mobile" type="tel" maxlength="12" placeholder="手机号"></div>
				<div class="bgtexts"><input name="tel" id="tel" type="tel" maxlength="12" placeholder="固定电话"></div>
				<div class="bgtexts">
					<span>详细地址</span> 
					<textarea name="address" id="address" cols="45" rows="12"></textarea>
				</div>
				<div class="bgtexts"><input name="postalcode" id="postalcode" type="tel" maxlength="6" placeholder="邮政编码"></div>
				<div class="bgtexts" style="background:none"><button id="save_def" type="button" class="release_btn">确认并设置为默认地址</button></div>
			</div>
		</div>

		<div class="editfor"><p id="back-to-top"><a href="#totop"><i data-icon="&#xe629;"></i>顶部</a></p></div>
	</body>   
</html>