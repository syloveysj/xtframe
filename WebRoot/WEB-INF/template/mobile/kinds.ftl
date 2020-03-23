<!DOCTYPE html>
<html>
	<head>
		<title>图书分类 - 希可尔图书</title>
		<#include "controls/header.ftl">
		<style>
		html, body { height: 100%;}
		section {position: relative;overflow: hidden; padding: 1em;height: 100%;}
		.panels{ background:#fff}
		section section, section section:nth-child(2n)  {border-top:1px #eee solid;}
		section section h1  { color:#111; }
		.panels section{ min-height:100%; height:auto}
		.panels, .log,.menu, pre {position: absolute;top: 0; bottom: 0;right: 0;left: 110px; overflow: scroll; }
		.log,.menu {width:110px; right: auto;left: 0; background:#eee; height:100%; border-right:1px #d2d2d2 solid; text-align:center;}
		.menu a {color:#333;display: block;width: 100%;padding: 20px 0; border-top:1px #e4e4e4 solid;
		text-decoration: none;background:#eee; box-sizing: border-box;-moz-box-sizing: border-box; font-size:0.85em}
		.menu a.active,.menu a:active, .menu a:hover {background: #fff; border-right:1px #fff solid; color:#f1912c}
		 @media screen and (max-width: 1000px) {
		.panels,.log,.menu {top: 0;}
		.menu_demo{ margin-top:46px}}
		</style>
	</head>
<body>
	<!--头部-->
	<div class="header">
		<a href="javascript:window.history.back();" class="tbr_rbtn" data-icon="&#xe62a;" title="返回" style="width:auto">分类</a>
		<a href="${model._contextPath}/index.html" class="tbr_rbtn" data-icon="&#xe612;" title="首页" style="right:80px;"></a>
		<a href="${model._contextPath}/p100067.html" class="tbr_rbtn" data-icon="&#xe631;" title="个人中心" style="right:40px; font-size:0.85em"></a>
		<a href="${model._contextPath}/p100047.html" class="tbr_rbtn" data-icon="&#xe62f;" title="购物车" style="right:0;"><img src="${model._contextPath}/mobile/resources/img/point.png"></a>
	</div>
	<!--头部 end-->
	
	<#include "controls/header_search.ftl">
       
	<section class="menu_demo">
	 	<div class="menu">
	 		<a href="javascript:void(0);" data-panel="f0" <#if !model._param.id?exists>class="active"</#if>>所有分类</a>
<#if model.mx?exists && model.mx?has_content && (model.mx?size>2) >
	<#list model.mx as ls>
		<#if model._param.id?exists>
			<a href="javascript:void(0);" data-panel="f${ls_index+1}" <#if model._param.id==ls.cls_id>class="active"</#if>>${ls.cls_name}</a>
		<#else>
			<a href="javascript:void(0);" data-panel="f${ls_index+1}">${ls.cls_name}</a>
		</#if>
	</#list>
</#if>
	    </div>
		<div class="panels">
			<section data-panel="f0">
				<h1>所有分类</h1>
				<div class="dishbg">
					<ul>
						<li><a href="${model._contextPath}/p100048.html?start=0&size=10">所有图书</a></li>
					</ul>
				</div>
			</section>
<#if model.mx?exists && model.mx?has_content && (model.mx?size>2) >
	<#list model.mx as ls>
		<section data-panel="f${ls_index+1}">
			<h1>${ls.cls_name}</h1>
			<div class="dishbg">
				<ul>
					<li><a href="${model._contextPath}/p100048.html?cls=${ls.cls_value}&start=0&size=10">所有图书</a></li>
					<#list model.mn as item>
						<#if item.pid==ls.cls_id>
							<li><a href="${model._contextPath}/p100048.html?cls=${item.cls_value}&start=0&size=10">${item.cls_name}</a></li>
						</#if>
					</#list>
				</ul>
			</div>
		</section>
	</#list>
</#if>
		</div>
	</section>
<script src="${model._contextPath}/mobile/resources/lib/plugin/jquery-1.10.1.min.js"></script>
<script src="${model._contextPath}/mobile/resources/lib/plugin/jquery.customEvents.js"></script>
<script src="${model._contextPath}/mobile/resources/lib/plugin/jquery.panelSnap.js"></script>
<script>   
// Menu demo
$('.menu_demo .panels').panelSnap({
	$menu: $('.menu_demo .menu')
});   
</script>
</body>
</html>