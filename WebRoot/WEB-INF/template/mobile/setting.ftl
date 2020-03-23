<!DOCTYPE html>
<html>
	<head>
		<title>设置 - 希可尔图书</title>
		<#include "controls/header.ftl"> 
		<script type="text/javascript" src="${model._contextPath}/mobile/resources/js/search.js"></script>
	</head>
	<body id="totop">
		<!--头部-->
		<div class="header">
			<a href="javascript:window.history.back();" class="tbr_rbtn" data-icon="&#xe62a;" title="返回" style="width:auto">设置</a>
			<a href="javascript:void(0);" class="tbr_rbtn" data-icon="&#xe633;" title="搜索" style="right:80px;" id="mySwitch"></a>
			<a href="${model._contextPath}/index.html" class="tbr_rbtn" data-icon="&#xe612;" title="首页" style="right:40px;"></a>
			<a href="${model._contextPath}/p100047.html" class="tbr_rbtn" data-icon="&#xe62f;" title="购物车" style="right:0;"><img src="${model._contextPath}/mobile/resources/img/point.png"></a>
		</div>
		<!--头部 end-->	
		
		<#include "controls/header_search.ftl">
		
		<div class="topNews">
			<ul>
		     	<li>
		        	<a href="${model._contextPath}/p100110.html"><i class="ico_sets ico_advs"></i>
		        	反馈建议<img src="${model._contextPath}/mobile/resources/img/jiao.png" alt="跳转" width="8"></a>
		        </li>
		        <li>
		        	<a href="${model._contextPath}/p100077.html"><i class="ico_sets ico_help"></i>
		            帮助中心<img src="${model._contextPath}/mobile/resources/img/jiao.png" alt="跳转" width="8"></a>
		        </li>
		        <li>
		        	<a href="${model._contextPath}/p100075.html"><i class="ico_sets ico_call"></i>
		            联系我们<img src="${model._contextPath}/mobile/resources/img/jiao.png" alt="跳转" width="8"></a>
		        </li>
		        <li class="mt10">
		        	<a href="${model._contextPath}/p100076.html"><i class="ico_sets ico_key"></i>
		            修改密码<img src="${model._contextPath}/mobile/resources/img/jiao.png" alt="跳转" width="8"></a>
		        </li>
			</ul>
		</div>
	</body>   
</html>