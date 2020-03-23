<!DOCTYPE HTML>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>流程办理-模版1</title>
		<link href="${model._contextPath}/web/css/common.css" rel="stylesheet" type="text/css" />
		<link href="${model._contextPath}/web/js/bui-2.1.1/css/bs3/dpl-min.css" rel="stylesheet" type="text/css" />
		<link href="${model._contextPath}/web/js/bui-2.1.1/css/bs3/bui-min.css" rel="stylesheet" type="text/css" />
		<link href="${model._contextPath}/web/js/bui-2.1.1/css/layout-c2.css" rel="stylesheet" type="text/css" />
	</head>
	<body>
	<#if model.data?exists && model.data?has_content>
		<div class="container">
			<div class="row" style="margin-top:50px">
				<#if model.data.isApply?exists && model.data.isApply>
					<#if model.data.procDefinition?exists && model.data.procDefinition.applyNode?exists && model.data.procDefinition.applyNode.url?has_content>
					<div class="panel span25 panel-primary">
						<div class="panel-header">
							<h3>表单：${model.data.procDefinition.applyNode.nodeName}</h3>
						</div>
						<div class="panel-body">
							<div class="row">
								<iframe id="frame_content_${model.data.procDefinition.applyNode.nodeID}" src="${model._contextPath}${model.data.procDefinition.applyNode.url}" onload="reinitIframe('frame_content_${model.data.procDefinition.applyNode.nodeID}')" class="span24" scrolling="no" frameborder="0" onload="this.height=100"></iframe>
							</div>
						</div>
					</div>
					</#if>
				<#else>
					<#if model.data.froms?exists && model.data.froms?has_content && (model.data.froms?size>0)>
						<#list model.data.froms as row>
						<div class="panel span25 panel-primary">
							<div class="panel-header">
								<h3>表单：${row.nodename}</h3>
							</div>
							<div class="panel-body">
								<div class="row">
									<iframe id="frame_content_${row.nodeid}" src="${row.url}?procInstKey=${model.data.procInstKey}<#if row.businessid?has_content>&businessid=${row.businessid}</#if><#if (model.data.isReadonly?exists && model.data.isReadonly) || (row.readOnly?exists && row.readOnly)>&readonly=1</#if>" onload="reinitIframe('frame_content_${row.nodeid}')" class="span24" scrolling="no" frameborder="0" onload="this.height=100"></iframe>
								</div>
							</div>
						</div>
						</#list>
					</#if>
					
					<#if model.data.records?exists && model.data.records?has_content && (model.data.records?size>0)>
						<div class="panel span25 panel-success">
							<div class="panel-header">
								<h3>历史</h3>
							</div>
							<div class="panel-body">
								<div class="row span24">
									<table class="table table-striped table-bordered table-condensed">
										<thead>
											<tr>
												<th style="text-align:center">&nbsp;#&nbsp;</th>
												<th style="text-align:center">环　节</th>
												<th style="text-align:center">人　员</th>
												<th style="text-align:center">意　见</th>
												<th style="text-align:center">结　论</th>
												<th style="text-align:center">时　间</th>
											</tr>
										</thead>
										<tbody>
											<#list model.data.records as row>
												<tr>
													<td style="text-align:center">${row_index+1}</td>
													<td style="text-align:center">${row.nodename}</td>
													<td style="text-align:center">${row.realname}[${row.username}]</td>
													<td style="text-align:center">${row.opinion}</td>
													<td style="text-align:center">${row.result}</td>
													<td style="text-align:center">${row._time}</td>
												</tr>
											</#list>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</#if>
				</#if>
				
				<#if model.data.isReadonly?exists && !model.data.isReadonly>
					<div class="panel span25 panel-warning">
						<div class="panel-header">
							<h3>意见</h3>
						</div>
						<div class="panel-body">
							<div class="row span24">
								<textarea id="opinion" name="opinion" class="panel span23"></textarea>
							</div>
						</div>
					</div>
				</#if>
			</div>
		</div>
		<br><br>
		
		<div class="row tools-top">
			<div id="wf_opts" style="margin-top: 10px;margin-left: 20px;">
				<select id="transition" name="transition" class="input-normal hide"></select>&nbsp;&nbsp;
				<select id="assignee" name="assignee" class="input-normal hide"></select>&nbsp;&nbsp;
				<!-- <button type="button" id="btn_save" class="button">保存</button>&nbsp;&nbsp; -->
				<button type="button" id="btn_close" class="button">关闭</button>
				
				&nbsp;&nbsp;&nbsp;&nbsp;
				<#if model.data.isApply?exists && model.data.isApply>
					<span class="label label-info" style="font-size:14px;">当前：${model.data.procDefinition.applyNode.nodeName} [${model.data.procDefinition.businessName}]</span>
				<#else>
					<#if model.data.isEnd?exists && model.data.isEnd>
						<span class="label label-info" style="font-size:14px;">该流程已办结</span>
					<#else>
						<span class="label label-info" style="font-size:14px;">当前：${model.data.currNode.nodeName} [${model.data.procDefinition.businessName}]</span>
					</#if>
				</#if>
				
				<#if model.data.ableWithdraw?exists && model.data.ableWithdraw>
					&nbsp;&nbsp;&nbsp;&nbsp;
					<button type="button" id="btn_withdraw" class="button button-warning">撤回</button>
				</#if>
				
				<#if model.data.ableDiscard?exists && model.data.ableDiscard>
					&nbsp;&nbsp;&nbsp;&nbsp;
					<button type="button" id="btn_discard" class="button button-danger">作废</button>
				</#if>
			</div>
		</div>
					
		<!-- 脚本 -->
		<script type="text/javascript" src="${model._contextPath}/web/js/bui-2.1.1/jquery-1.8.1.min.js"></script>
		<script type="text/javascript" src="${model._contextPath}/web/js/bui-2.1.1/bui.js"></script>
		<script type="text/javascript" src="${model._contextPath}/web/js/plugin/ajaxutil.js"></script>
		<script type="text/javascript" src="${model._contextPath}/web/js/plugin/pubopt.js"></script>
		<script type="text/javascript" src="${model._contextPath}/web/frame/js/config.js"></script>
		<script>
		var contextPath = "${model._contextPath}";
		var isApply = ${model.data.isApply?string};
		var isReadonly = ${model.data.isReadonly?string};
		var busForm = null;
		<#if model.data.isApply?exists && model.data.isApply>
			<#if model.data.isApply?exists && model.data.isApply && model.data.procDefinition.applyNode?exists>
				var nodeId = "${model.data.procDefinition.applyNode.nodeID}";
			<#else>
				var nodeId = "";
			</#if>
			var procDefID = "${model.data.procDefinition.procDefID}";
		<#else>
			var procInstID = "${model.data.procInstID}";
			var procInstKey = "${model.data.procInstKey}";
			<#if (model.data.isReadonly?exists && model.data.isReadonly) || (model.data.isEnd?exists && model.data.isEnd)>
				var nodeId = "";
				var taskId = "";
			<#else>
				var nodeId = "${model.data.currNode.nodeID}";
				var taskId = "${model.data.taskId}";
			</#if>
			<#if model.data.busFormJson?exists>
				busForm = ${model.data.busFormJson};
			</#if>
		</#if>
		var users = ${model.data.usersJson};
		var transitions = ${model.data.transitionsJson};
		</script>
		<script type="text/javascript" src="${model._contextPath}/web/frame/workflow/wf_working_1.js"></script>
	</#if>
	</body>
</html>