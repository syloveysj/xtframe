<!DOCTYPE HTML>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>配送信息编辑</title>
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
					<div class="row">
						<div class="control-group">
							<label class="control-label"><s>*</s>订单编号：</label>
							<div class="controls span12">
								<input type="text" id="orders_id" name="orders_id" data-rules="{required:true}" readonly="readonly" style="width:225px">
								<button type="button" id="but_orders_id" class="button button-small"><i class="icon-search"></i>选择</button>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="control-group">
							<label class="control-label"><s>*</s>快递公司：</label>
							<div class="controls span12">
								<input type="hidden" id="kdbh" name="kdbh"/>
								<input type="text" id="kdmc" name="kdmc" data-rules="{required:true}" readonly="readonly" style="width:225px"/>
								<button type="button" id="but_kdmc" class="button button-small"><i class="icon-search"></i>选择</button>
							</div>
						</div>	
					</div>
					<div class="row">
						<div class="control-group">
							<label class="control-label"><s>*</s>快递单号：</label>
							<div class="controls span12">
								<input type="text" id="kddh" name="kddh" data-rules="{required:true}" style="width:289px"/>
							</div>
						</div>	
					</div>
					<div class="row tools-top">
						<div style="margin-top: 10px;margin-left: 20px;">
							<button type="button" id="btn_save" class="button button-primary">保　存</button>
							<button type="button" id="btn_gb" class="button">关　闭</button>
						</div>
					</div>
				</form>
			</div>
		</div>
		<br><br>
		<div id="orders_idDialog" class="hide">
			<div id="orders_idGrid"></div>
		</div>
		
		<div id="kdmcDialog" class="hide">
			<div id="kdmcGrid"></div>
		</div>
		
		<!-- 脚本 -->
		<script type="text/javascript" src="${model._contextPath}/web/js/bui-2.1.1/jquery-1.8.1.min.js"></script>
		<script type="text/javascript" src="${model._contextPath}/web/js/bui-2.1.1/bui.js"></script>
		<script type="text/javascript" src="${model._contextPath}/web/js/plugin/ajaxutil.js"></script>
		<script type="text/javascript" src="${model._contextPath}/web/js/plugin/pubopt.js"></script>
		<script type="text/javascript" src="${model._contextPath}/web/frame/js/config.js"></script>
		<script type="text/javascript" src="${model._contextPath}/web/js/My97DatePicker/WdatePicker.js"></script>
		<script>
		var contextPath = "${model._contextPath}";
		</script>
		<script type="text/javascript" src="${model._contextPath}/web/app/base/hair_edit.js"></script>
	</body>
</html>