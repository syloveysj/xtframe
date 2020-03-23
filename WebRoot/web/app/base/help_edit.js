BUI.use(['bui/layout','bui/grid','bui/data','bui/menu','bui/overlay','bui/form'],function (Layout,Grid,Data,Menu,Overlay,Form) {
	var paramObj = PubOPT.GetParamObj(window.location.search);
	var pgForm = new Form.Form({
		srcNode : '#J_Form'
	}).render();
	
	
	if("id" in paramObj) {
		var data = AjaxUtil.command.executeQuery("wx_help_4", {id: paramObj.id});
		if(AjaxUtil.command.isSucceed(data) && data.rows.length>0) {
			PubOPT.setFormValue(data.rows[0]);
			var row = data.rows[0];
			$('#title').append(row.title);
			$('#ss_content').val(row.content);
			$('#ordno').val(row.ordno);
		}
	}
	$("#btn_save").click(function() {
		//检测变量是否实例化
		if(!pgForm.isValid()) return;
		var sHTML = document.getElementById("eWebEditor1").contentWindow.getHTML();
		$("#ss_content").val(sHTML);
		if("id" in paramObj) {
			$("#id").val(paramObj.id);
		}else{
			var data = AjaxUtil.command.executeQuery("wx_help_3");
			var id = data.rows[0].seq;
			$("#id").val(id);
		}
		var fromParam = PubOPT.formatObjToArray(['id','title','ordno', 'ss_content']);
		if(AjaxUtil.command.isSucceed(AjaxUtil.command.executeUpdate("wx_help_5",fromParam))) {
			colsePage();
		} else {
			BUI.Message.Alert('保存失败','error');
		}
	});
	
	$("#btn_gb").click(function(){
		colsePage();
	});
	
	function colsePage() {
		PubOPT.openPage({
			id: PubOPT.getCurrentPageId(),
			isClose: true
		});
		if("ppid" in paramObj) {
			PubOPT.openPage({
				id: paramObj.ppid,
				reload: true
			});
		}
	}
	
	
});

