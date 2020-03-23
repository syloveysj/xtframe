<!DOCTYPE HTML>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>运费配置信息编辑</title>
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
								<select id="lx" style="width:295px">
									<option value="1">满额免邮  </option>
									<option value="2">范围免邮</option>
									<option value="3">标准计费 </option>
									<option value="4">固定收费 </option>
								</select>
							</div>
						</div>
					</div>
					<div class="row" id="ds1">
						<div class="control-group">
							<label class="control-label"><s>*</s>满额包邮：</label>
							<div class="controls span12">
								<input type="text" id="mby" name="mby" style="width:289px"/>
							</div>
						</div>	
					</div>
					<div class="row" id="ds5" style="display:none">
						<div class="control-group">
							<label class="control-label"><s>*</s>固定收费：</label>
							<div class="controls span12">
								<input type="text" id="gdsf" name="gdsf" style="width:289px"/>
							</div>
						</div>	
					</div>
					<div class="row" id="ds2" style="display:none">
						<div class="control-group">
							<label class="control-label"><s>*</s>最小金额：</label>
							<div class="controls span12">
								<input type="text" id="min_money" name="min_money" data-rules="{required:true}" style="width:289px"/>
							</div>
						</div>	
					</div>
					<div class="row" id="ds3" style="display:none">
						<div class="control-group">
							<label class="control-label"><s>*</s>最大金额：</label>
							<div class="controls span12">
								<input type="text" id="max_money" name="max_money" data-rules="{required:true}" style="width:289px"/>
							</div>
						</div>	
					</div>
					<div class="row" id="ds4" style="display:none">
						<div class="control-group">
							<label class="control-label"><s>*</s>物流选择：</label>
							<div class="controls span12">
								<input type="hidden" id="postage_id" />
								<input type="text" id="postage_name" name="postage_name" data-rules="{required:true}" readonly="readonly" style="width:225px">
								<button type="button" id="but_postage_id" class="button button-small"><i class="icon-search"></i>选择</button>
							</div>
						</div>	
					</div>
					<div class="row">
						<div class="control-group">
							<label class="control-label"><s>*</s>运行状态：</label>
							<div class="controls span12">
								<select id="state" style="width:295px">
									<option value="0">暂停运行 </option>
									<option value="1">立即运行</option>
								</select>
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
		<div id="postage_idDialog" class="hide">
			<div id="postage_idGrid"></div>
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
		<script type="text/javascript" src="${model._contextPath}/web/app/base/freight_edit.js"></script>
	</body>
</html>