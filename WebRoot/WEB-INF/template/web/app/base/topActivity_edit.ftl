<!DOCTYPE HTML>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>配送信息编辑</title>
		<link href="${model._contextPath}/web/css/common.css" rel="stylesheet" type="text/css" />
		<link href="${model._contextPath}/web/js/bui-2.1.1/css/dpl-min.css" rel="stylesheet" type="text/css" />
		<link href="${model._contextPath}/web/js/bui-2.1.1/css/bui-min.css" rel="stylesheet" type="text/css" />
		<link href="${model._contextPath}/web/js/bui-2.1.1/css/layout-c2.css" rel="stylesheet" type="text/css" />
		
		<style type="text/css">
		/*!* 解决IE下树图标显示异常*/
		.button{
			filter:;
		}
		</style>
		<style type="text/css">
			.big-box{  height:150px;
			           overflow:hidden;}
			.big-box div{ float:left;  }
			.photo{ width:200px; height:200px; 
		        float:left;margin-left:10px;
				margin-right:20px;}
			.word2{ margin-left:20px;}
			.word-in{ font-size:16px; font-family:"微软雅黑"; color:#000;
			          margin-top:10px;}
			.word-in dt{ margin-bottom:6px; }
			.hongse{ color:#bf0010;font-size:16px;}
			.lanse{ color:#4A3D9C;font-size:16px;}
			.divcss5{border:1px solid #F00} 
		</style>
	</head>
	<body>
		<div class="container">
			<div class="row" style="margin-top:50px">
				<form id="J_Form" class="form-horizontal">
					<h3>基本信息</h3>
					<div class="row" style="width:640px ;float:left;">
						<div class="control-group " >
							<label class="control-label"><s>*</s>活动标题：</label>
							<div class=" controls">
								<input type="text" id="activity_name" name="activity_name" style="width:460px" />
							</div>
						</div>	
						<div class="control-group ">
							<label class="control-label"><s>*</s>活动地址：</label>
							<div class=" controls">
								<input type="text" id="activity_url" name="activity_url"   style="width:460px"/>
							</div>
						</div>
						<div class="control-group ">
							<label class="control-label"><s>*</s>起始时间：</label>
							<div class=" controls">
								<input id="activity_qtime" type="text" style="width:460px" class="Wdate" onFocus="WdatePicker({isShowWeek:true,dateFmt:'yyyy-MM-dd HH:mm:ss'})"/> 
							</div>
						</div>
						<div class="control-group ">
							<label class="control-label"><s>*</s>结束时间：</label>
							<div class=" controls">
								<input id="activity_stime" type="text" style="width:460px" class="Wdate" onFocus="WdatePicker({isShowWeek:true,dateFmt:'yyyy-MM-dd HH:mm:ss'})"/> 
							</div>
						</div>
						<div class="control-group ">
							<label class="control-label"><s>*</s>展示模块：</label>
							<div class=" controls">
								<select id="position" style="width:460px;">
									<option value="0">上部活动栏--top</option>
									<option value="1">底部活动栏--bottom</option>
								</select>
							</div>
						</div>
						<div class="control-group ">
							<label class="control-label"><s>*</s>展示图片：</label>
							<div class="controls ">
								<input type="text" id="img_path" name="img_path" readonly="readonly" style="width:390px"/>
								&nbsp;&nbsp;<span id="fileUpload" class="label label-info">上传图片</span>
							</div>
						</div >
						<div class="control-group ">
							<label class="control-label"><s>*</s>活动简介：</label>
							<div class="controls ">
								<textarea id="remark" name="remark" style="max-width:460px;max-height:100px;min-height:100px;min-width:460px"></textarea>
							</div>
						</div >
					</div>
					<div class="divcss5 " style="width:300px;height:200px;float:left;border:1px solid #ccc;">
						    <div class="clearfix">
						      <div id="imgviewWrap" style="background:#666;float:left;"></div>
						    </div>
						    <span style="width:300px;text-align:center; float:left;color:red">建议图片大小4:1</span>
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
		
		<iframe name='hidden_frame' id="hidden_frame" style='display:none'></iframe>
		<br><br>
		<div id="columnDialog" class="hide">
			<div style="height:100%; overflow:auto;"><ul id="columntree" class="ztree"></ul></div>
		</div>
		<div id="uploadDialog" class="hide">
			<form id="upload_Form" name="upload_Form" action="${model._contextPath}/server/imageUpload.do" method="post" enctype="multipart/form-data" target="hidden_frame" class="form-horizontal">
				<div class="row">
					<div class="control-group span24">
						<label class="control-label">图片文件：</label>
						<div class="controls">
							<input type="file" id="file" name="file" readonly="readonly" style="width:310px">
						</div>
					</div>
				</div>
			</form>
			<iframe name='hidden_frame' id="hidden_frame" style='display:none'></iframe>
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
		<script type="text/javascript" src="${model._contextPath}/web/app/base/topActivity_edit.js"></script>
	</body>
</html>