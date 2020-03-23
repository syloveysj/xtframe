
<!DOCTYPE html>
<html lang="en">
	<head>
		<title> 希可尔图书</title>
		<#include "controls/header.ftl">
		<link href="${model._contextPath}/web/js/pull-to-refresh/iscroll-thors.css" rel="stylesheet" type="text/css">
		<script type="text/javascript" src="${model._contextPath}/mobile/resources/js/popauthorlist.js?rf=2"></script>
		<script type="text/javascript" src="${model._contextPath}/mobile/resources/js/search.js"></script>
		<script type="text/javascript" src="${model._contextPath}/web/js/pull-to-refresh/iscroll.js"></script>
	
<script type="text/javascript">

</script>

	</head>
	<body id="totop">
		<!--头部--> 
		<div class="header">
			<a href="javascript:window.history.back();" class="tbr_rbtn" data-icon="&#xe62a;" title="返回" style="width:auto">人气作者</a>
			<a href="javascript:void(0);" class="tbr_rbtn" data-icon="&#xe633;" title="搜索" style="right:120px;" id="mySwitch"></a>
			<a href="${model._contextPath}/index.html" class="tbr_rbtn" data-icon="&#xe612;" title="首页" style="right:80px;"></a>
		    <a href="${model._contextPath}/p100067.html" class="tbr_rbtn" data-icon="&#xe631;" title="个人中心" style="right:40px; font-size:0.85em"></a>
		    <a href="${model._contextPath}/p100047.html" class="tbr_rbtn" data-icon="&#xe62f;" title="购物车" style="right:0;"><img src="${model._contextPath}/mobile/resources/img/point.png"></a>
		</div>
		<!--头部 end-->
		
		<#include "controls/header_search.ftl">
	<div>
		<p></p><span></span>
	</div>
	<!--内容-->
	<input type="hidden" id="totalcount" value="${model.authorCt.get(0).totalcount}"/>
	<input type="hidden" id="start" value="${model.authorCt.get(0).start}"/>
  	<input type="hidden" id="pageSize" value="3"/>
  	<input type="hidden" id="contextPath" value="${model._contextPath}"/>
<#if model.popData?exists && model.popData?has_content && (model.popData?size>0) >
		<!--author--> 
		<div id="wrapper">
		<div id="scroller">
		<div class="bookkinds" >
		<div style="height:46px">&nbsp;</div>
			<div class="fav_list" >
				<ul id="thelist">
				<#list model.popData as ls>
					<li>
		            	<a href="${model._contextPath}/p100066.html?id=${ls.author_id}">
		                	<img src="${model._contextPath}${ls.small_relative_path}">
		                    <p class="atrname">${ls.author_name}&nbsp;
		                    <span>
		                    <#if ls.author_detail?has_content && (ls.author_detail?length>16)>
		                    	${ls.author_detail[0..16]}...
		                    <#else>
		                    	${ls.author_detail}
		                    </#if>
		                    </span></p>
		                    <p class="atrtxt"><span>代表作品&nbsp;</span>
		                    <#if ls.magnum?has_content && (ls.magnum?length>16)>
		                    	${ls.magnum[0..16]}...
		                    <#else>
		                    	${ls.magnum}
		                    </#if>
		                    </p>
		                </a>
		            </li>
				</#list>
				</ul>
				<!-----下拉刷新div------>
				<div id="pullUp" >
					<span class="pullUpIcon" id="pullUpIcon"></span><span class="pullUpLabel" id="pullUpLabel"></span>
				</div>
				<!-----下拉刷新div------>
			</div>
		</div>
		</div>
		</div>
		<!--author end-->
</#if>

	<div class="editfor"><p id="back-to-top"><a href="#totop"><i data-icon="&#xe629;"></i>顶部</a></p></div>
	
	</body>   
</html>
