<!DOCTYPE HTML>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>畅销推荐编辑</title>
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
							<label class="control-label"><s>*</s>商品编号：</label>
							<div class="controls span12">
								<input type="hidden" id="goods_id" />
								<input type="text" id="goods_name" name="goods_name" data-rules="{required:true}" readonly="readonly" style="width:225px">
								<button type="button" id="but_goods_id" class="button button-small"><i class="icon-search"></i>选择</button>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="control-group">
							<label class="control-label"><s>*</s>推荐序号：</label>
							<div class="controls span12">
								<select id="sortno" style="width:295px">
									<option value="1">△△△△△强烈推荐△△△△△  </option>
									<option value="2">△△△△△非常推荐△△△△△</option>
									<option value="3">△△△△△一般推荐△△△△△ </option>
								</select>
							</div>
						</div>	
					</div>
					<div class="row">
						<div class="control-group">
							<label class="control-label"><s>*</s>推荐理由：</label>
							<div class="controls span12">
								<textarea id="remark" name="remark" style="max-width:265px;max-height:100px;min-height:60px;min-width:289px"></textarea>
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
		<div id="goods_idDialog" class="hide">
			<div id="goods_idGrid"></div>
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
		<script type="text/javascript" src="${model._contextPath}/web/app/base/recommend_edit.js"></script>
	</body>
</html>