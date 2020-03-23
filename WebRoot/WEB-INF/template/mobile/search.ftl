<!DOCTYPE html>
<html>
	<head>
		<title>首页 - 希可尔图书</title>
		<#include "controls/header.ftl">
		<script type="text/javascript" src="${model._contextPath}/mobile/resources/js/search.js"></script>
		<script type="text/javascript" src="${model._contextPath}/mobile/resources/js/search_data.js"></script>
		<link href="${model._contextPath}/web/js/pull-to-refresh/iscroll.css" rel="stylesheet" type="text/css">
		<script type="text/javascript" src="${model._contextPath}/web/js/pull-to-refresh/iscroll.js"></script>
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
	<#if model._param.goods_name?exists && model._param.goods_name?has_content>
		<#assign goods_name="&goods_name="+model._param.goods_name>
	<#else>
		<#assign goods_name="">
	</#if>
		
	<!--头部 end-->
	<!--内容-->
	<input type="hidden" id="totalcount" value="<#if model.data?exists && model.data?has_content && (model.data?size>0) ><#if model.data.total?exists && model.data.total?has_content && (model.data.total?size>0) >${model.data.total}<#else>0</#if></#if>"/>
	<input type="hidden" id="start" value="0"/>
  	<input type="hidden" id="pageSize" value="6"/>
  	<input type="hidden" id="contextPath" value="${model._contextPath}"/>
  	

	<div class="ipt_search" id="123" >
		<form action="${model._contextPath}/p100102.html" method="post" id="submit" >
			<input type="text" placeholder="输入关键字" name="goods_name" id="book" value="${(model._param.goods_name)?default('')}"/>
			<input type="hidden" value="0" name="start" />
			<input type="hidden" value="10" name="size" />
			<a href="#" id="js-submit"  >搜好书</a>
		</form>
	</div>

	<div class="device">
			<div class="ser_end"><p>为您找到<#if model.data?exists && model.data?has_content && (model.data?size>0) ><#if model.data.total?exists && model.data.total?has_content && (model.data.total?size>0) >${model.data.total}<#else>0</#if></#if>条搜索结果</p></div>
	</div>
	<div id="wrapper">
	<div id="scroller">	
		<div class="page_list">
		     <div class="list">
		       	<ul id="thelist">
		       		<#if model.data?exists && model.data?has_content && (model.data?size>0) >
			       		<#if model.data.rows?exists && model.data.rows?has_content && (model.data.rows?size>0) >
				       	<#list model.data.rows as ti >
				       	  <li>
				        	<a href="${model._contextPath}/p100050.html?id=${ti.goods_id}">  
					          	<div class="img_wrap"><img src="${model._contextPath}${ti.small_relative_path}" width="80"></div>
					            <div class="text_wrap"> 
					            	<p class="name">${ti.goods_name}</p>
					        	    <p class="price">${ti.goods_author} 著</p> 
					        	    <p class="price"><span class="feed"> ${ti.goods_factory}出版.</span></p>
					            </div>
				            </a>
				          </li>
				        </#list>
			         	</#if>
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
</body>
</html>