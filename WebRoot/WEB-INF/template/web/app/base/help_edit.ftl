<!DOCTYPE HTML>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>最近新书编辑</title>
		<link href="${model._contextPath}/web/css/common.css" rel="stylesheet" type="text/css" />
		<link href="${model._contextPath}/web/js/bui-2.1.1/css/dpl-min.css" rel="stylesheet" type="text/css" />
		<link href="${model._contextPath}/web/js/bui-2.1.1/css/bui-min.css" rel="stylesheet" type="text/css" />
		<link href="${model._contextPath}/web/js/bui-2.1.1/css/layout-c2.css" rel="stylesheet" type="text/css" />
	</head>
	<body>
		<div class="container">
			<div class="row" style="margin-top:50px">
				<form id="J_Form" class="form-horizontal">
					<h3>基本信息</h3>
					
					<div class="row" style="width:640px ;float:left;">
						<div class="control-group span20" >
							<label class="control-label"><s>*</s>帮助标题：</label>
							<div class=" controls" >
								<input type="hidden" id="id" name="id" />
								<input type="text" id="title" name="title" data-rules="{required:true}" style="width:460px" />
							</div>
						</div>
						<div class="control-group span20" >
							<label class="control-label"><s>*</s>序号：</label>
							<div class=" controls" >
								<input type="text" id="ordno" name="ordno" data-rules="{required:true,number:true}" style="width:460px" />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label">帮助内容：</label>
							<div class="controls span12">
								<div class=" controls">
									<iframe ID="eWebEditor1" src="../web/js/ewebeditor/ewebeditor.htm?id=ss_content&style=coolblue&skin=flat2" frameborder="0" scrolling="no" width="898" HEIGHT="350"></iframe>
									<textarea name="ss_content" id="ss_content" style="display:none"></textarea>
								</div>
							</div>
						</div>
					</div>
					
					<div class="row tools-top">
						<div style="margin-top: 10px;margin-left: 20px;">
							<button type="button" id="btn_save" class="button button-primary" >保　存</button>
							<button type="button" id="btn_gb" class="button">关　闭</button>
						</div>
					</div>
				</form>
			</div>
		</div>
		<br><br>
		<!-- 脚本 -->
		<script type="text/javascript" src="${model._contextPath}/web/js/bui-2.1.1/jquery-1.8.1.min.js"></script>
		<script type="text/javascript" src="${model._contextPath}/web/js/bui-2.1.1/bui.js"></script>
		<script type="text/javascript" src="${model._contextPath}/web/js/plugin/ajaxutil.js"></script>
		<script type="text/javascript" src="${model._contextPath}/web/js/plugin/pubopt.js"></script>
		<script type="text/javascript" src="${model._contextPath}/web/frame/js/config.js"></script>
		<script>
		var contextPath = "${model._contextPath}";
		</script>
		<script type="text/javascript" src="${model._contextPath}/web/app/base/help_edit.js"></script>
	</body>
</html>