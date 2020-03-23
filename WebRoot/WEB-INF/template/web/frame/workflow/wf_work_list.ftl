<!DOCTYPE HTML>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>新建工作</title>
		<link href="${model._contextPath}/web/css/common.css" rel="stylesheet" type="text/css" />
		<link href="${model._contextPath}/web/js/bui-2.1.1/css/dpl-min.css" rel="stylesheet" type="text/css" />
		<link href="${model._contextPath}/web/js/bui-2.1.1/css/bui-min.css" rel="stylesheet" type="text/css" />
		<link href="${model._contextPath}/web/js/bui-2.1.1/css/layout-c2.css" rel="stylesheet" type="text/css" />
	</head>
	<body style="margin:10px">
	<#if model.list?exists && model.list?has_content && (model.list?size>0)>
		<div class="detail-section">  
			<div class="row">
				<#list model.list as row>
					<div class="span12 well">
						<h2>${row.businessname} <span class="badge">V${row.pdversion}</span></h2>
						<p style="margin-bottom: 0;">
							<div class="span6">
								发布时间：${row._time}
							</div>
							<div class="span3">
								<button class="button" action="view" pdid="${row.procdefid}">流程设计图</button>
							</div>
							<div class="span2">
								<button class="button button-success" action="new" pdid="${row.procdefid}" pdname="${row.businessname}">新建</button>
							</div>
						</p>
					</div>
				</#list>
			</div>
		</div>
		
		<div id="viewDialog" class="hide">
			<img id="viewImg" style="width:586px; height:607px;"/>
		</div>
		
		<!-- 脚本 -->
		<script type="text/javascript" src="${model._contextPath}/web/js/bui-2.1.1/jquery-1.8.1.min.js"></script>
		<script type="text/javascript" src="${model._contextPath}/web/js/bui-2.1.1/bui.js"></script>
		<script type="text/javascript" src="${model._contextPath}/web/js/plugin/ajaxutil.js"></script>
		<script type="text/javascript" src="${model._contextPath}/web/js/plugin/pubopt.js"></script>
		<script type="text/javascript" src="${model._contextPath}/web/frame/js/config.js"></script>
		<script>
		var contextPath = "${model._contextPath}";
		</script>
		<script type="text/javascript" src="${model._contextPath}/web/frame/workflow/wf_work_list.js"></script>
	</#if>
	</body>
</html>