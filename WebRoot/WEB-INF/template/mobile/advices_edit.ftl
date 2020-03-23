<!DOCTYPE html>
<html>
	<head>
		<title>设置 - 希可尔图书</title>
		<#include "controls/header.ftl">
		<script type="text/javascript">
			var basePath = "${model._contextPath}";
		</script>
		<script type="text/javascript" src="${model._contextPath}/mobile/resources/js/advices_edit.js"></script>
		<script type="text/javascript" src="${model._contextPath}/mobile/resources/js/search.js"></script>
	</head>
	<body id="totop">
		<!--头部-->
		<div class="header">
			<a href="javascript:window.history.back();" class="tbr_rbtn" data-icon="&#xe62a;" title="返回" style="width:auto">编辑建议</a>
			<a href="${model._contextPath}/index.html" class="tbr_rbtn" data-icon="&#xe612;" title="首页" style="right:80px;"></a>
			<a href="${model._contextPath}/p100067.html" class="tbr_rbtn" data-icon="&#xe631;" title="个人中心" style="right:40px; font-size:0.85em"></a>
			<a href="${model._contextPath}/p100047.html" class="tbr_rbtn" data-icon="&#xe62f;" title="购物车" style="right:0;"><img src="${model._contextPath}/mobile/resources/img/point.png"></a>
		</div>
		<!--头部 end-->
    	
    	<#include "controls/header_search.ftl">
        
		<div class="page_list" style="margin-top:46px">
			<div class="contactus">
				<div class="bgtexts">
					<textarea placeholder="请输入您的反馈意见" name="advices_info" id="advices_info" cols="45" rows="12" style="height:200px"></textarea>
				</div>
				<div class="bgtexts" style="background:none"><button id="save_def" type="button" class="release_btn">确认提交意见</button></div>
			</div>
		</div>
		<div  style="margin-bottom:50px">
   	   		<div class="sex_mng">
	     			<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;感谢您对希尔图书的关注与支持!欢迎您提交任何与希尔图书相关问题与建议,我们将在第一时间处理!</p>
	     	</div>
		</div>
	</body>   
</html>