<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>模版编辑</title>
		<link rel="stylesheet" href="<%=path%>/work/resources/js-lib/codemirror-4.4/lib/codemirror.css">  
		<link rel="stylesheet" href="<%=path%>/work/resources/js-lib/codemirror-4.4/theme/eclipse.css">
		<link rel="stylesheet" href="<%=path%>/work/resources/js-lib/codemirror-4.4/addon/hint/show-hint.css">
		<link rel="stylesheet" href="<%=path%>/work/resources/js-lib/codemirror-4.4/addon/fold/foldgutter.css" />
		<script type="text/javascript" src="<%=path%>/work/resources/js-lib/codemirror-4.4/lib/codemirror.js"></script>  
		<script type="text/javascript" src="<%=path%>/work/resources/js-lib/codemirror-4.4/mode/javascript/javascript.js"></script>
		<script type="text/javascript" src="<%=path%>/work/resources/js-lib/codemirror-4.4/mode/vbscript/vbscript.js"></script>
		<script type="text/javascript" src="<%=path%>/work/resources/js-lib/codemirror-4.4/mode/xml/xml.js"></script>
		<script type="text/javascript" src="<%=path%>/work/resources/js-lib/codemirror-4.4/mode/css/css.js"></script>
		<script type="text/javascript" src="<%=path%>/work/resources/js-lib/codemirror-4.4/mode/htmlmixed/htmlmixed.js"></script>
		<script type="text/javascript" src="<%=path%>/work/resources/js-lib/codemirror-4.4/mode/markdown/markdown.js"></script>
		<script type="text/javascript" src="<%=path%>/work/resources/js-lib/codemirror-4.4/addon/fold/foldcode.js"></script>
		<script type="text/javascript" src="<%=path%>/work/resources/js-lib/codemirror-4.4/addon/fold/foldgutter.js"></script>
		<script type="text/javascript" src="<%=path%>/work/resources/js-lib/codemirror-4.4/addon/fold/brace-fold.js"></script>
		<script type="text/javascript" src="<%=path%>/work/resources/js-lib/codemirror-4.4/addon/fold/xml-fold.js"></script>
		<script type="text/javascript" src="<%=path%>/work/resources/js-lib/codemirror-4.4/addon/fold/markdown-fold.js"></script>
		<script type="text/javascript" src="<%=path%>/work/resources/js-lib/codemirror-4.4/addon/fold/comment-fold.js"></script>
		<script type="text/javascript" src="<%=path%>/work/resources/js-lib/codemirror-4.4/addon/hint/show-hint.js"></script>
		<script type="text/javascript" src="<%=path%>/work/resources/js-lib/codemirror-4.4/addon/hint/javascript-hint.js"></script>
		<script type="text/javascript" src="<%=path%>/work/resources/js-lib/codemirror-4.4/addon/selection/active-line.js"></script>
		<script type="text/javascript" src="<%=path%>/work/resources/js-lib/codemirror-4.4/addon/edit/matchbrackets.js"></script>
		<script type="text/javascript">
		var _xtframeCodeMirror = null;
		function myLoad() {
			/*var mixedMode = {
		        name: "htmlmixed",
		        scriptTypes: [{matches: /\/x-handlebars-template|\/x-mustache/i,
		                       mode: null},
		                      {matches: /(text|application)\/(x-)?vb(a|script)/i,
		                       mode: "vbscript"}]
		      };*/
			_xtframeCodeMirror = CodeMirror(document.body, {
				value: "",										//编辑器的初始值（文本）
				mode: "text/html",							//通用的或者在CodeMirror中使用的与mode相关联的mime
				theme: "eclipse",								//配置编辑器的主题样式(.cm-s-[name])
				lineNumbers: true,								//是否在编辑器左侧显示行号
				fixedGutter: false,								//是否行号区域是否随编辑区域水平滚动
				autoMatchParens: true,
				extraKeys: {
					"Alt-/": "autocomplete",
					"Ctrl-Q": function(cm) {
						cm.foldCode(cm.getCursor());
					}
				},
				foldGutter: true,
				gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
				styleActiveLine: true,
				matchBrackets: true,
				autofocus: true									//是否在初始化时自动获取焦点
			});
		}
		
		function getContent(){
			return _xtframeCodeMirror.getValue();
		}
		
		function setContent(content){
			_xtframeCodeMirror.setValue(content);
		}
		</script>
	</head>
	<body onload="myLoad()">
	</body>
</html>