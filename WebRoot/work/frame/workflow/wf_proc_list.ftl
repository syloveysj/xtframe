<!DOCTYPE HTML>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>业务列表</title>
		<link href="${model._contextPath}/web/css/common.css" rel="stylesheet" type="text/css" />
		<link href="${model._contextPath}/web/js/bui-2.1.1/css/dpl-min.css" rel="stylesheet" type="text/css" />
		<link href="${model._contextPath}/web/js/bui-2.1.1/css/bui-min.css" rel="stylesheet" type="text/css" />
		<link href="${model._contextPath}/web/js/bui-2.1.1/css/layout-c2.css" rel="stylesheet" type="text/css" />
	</head>
	<body>
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
		<script type="text/javascript" src="${model._contextPath}/web/frame/workflow/wf_proc_list.js"></script>
	</body>
</html>