<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="ckeditor" uri="/WEB-INF/ckeditor.tld" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		<title>富文本编辑器</title>
		<script type="text/javascript">
		var _xtframeParent;
		var _xtframeCKeditor;
		function init() {
			_xtframeCKeditor = CKEDITOR.instances['richEditor'];
			_xtframeCKeditor.on('instanceReady', function (event) {
				var editor = event.editor;
				setTimeout(function () {
						if (!editor.element) {
							setTimeout(arguments.callee, 100);
							return;
						}
						event.removeListener('instanceReady', this.callee);
						if (editor.name == 'richEditor') {
							//设置全屏
							var command = editor.getCommand('maximize');
							command.exec();
							
							//设置上传文件回调函数
							var bFilebrowserFn = editor._.filebrowserFn;
							var setUploadFileck = function(url, msg){
								CKEDITOR.tools.callFunction(bFilebrowserFn, url, msg);
							};
							editor._.filebrowserFn = CKEDITOR.tools.addFunction(setUploadFileck, editor);
						}
					}, 0);
				}, null, null, 9999);
		}
		
		function setParent(o){
			_xtframeParent = o;
			//创建事件示例
//			_xtframeParent.fireEvent('testshow', _xtframeParent);
		}
		
		function getContent(){
			return _xtframeCKeditor.getData();
		}
		
		function setContent(content){
			_xtframeCKeditor.setData(content);
		}
		</script>
	</head>
	<body onload="init()">
		<textarea cols="10" id="richEditor" name="editor1" rows="10"></textarea>  
		<ckeditor:replace replace="richEditor" basePath="/work/resources/js-lib/ckeditor-3.6.2/"></ckeditor:replace>  
	</body>
</html>