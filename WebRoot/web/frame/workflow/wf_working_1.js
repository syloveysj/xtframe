var saveSubmit;
BUI.use(['bui/layout','bui/grid','bui/data','bui/menu','bui/overlay','bui/form'],function (Layout,Grid,Data,Menu,Overlay,Form) {
	var paramObj = PubOPT.GetParamObj(window.location.search);
	if(transitions!=null && transitions.length>0) {
		if(transitions.length == 1) {
			$('#assignee').after('&nbsp;&nbsp;<button type="button" onclick="saveSubmit(\'' + transitions[0].name + '\')" class="button button-primary">' + transitions[0].name + '</button>');
		} else {
			var ops = '';
			for(var i=0; i<transitions.length; i++) {
				ops += '<option value="' + transitions[i].name + '">' + transitions[i].name + '</option>';
			}
			$('#transition').show();
			$('#transition').append(ops);
			$('#transition').change(function(){
				userSelectInit();
			});
			$('#assignee').after('&nbsp;&nbsp;<button type="button" onclick="saveSubmit()" class="button button-primary">提交</button>');
		}
		userSelectInit();
	}
	
	$("#btn_save").click(function() {
	});
	
	$("#btn_close").click(function() {
		BUI.Message.Show({
			title : '确认提示',
			msg : '您确定要离开吗?',
			icon : 'question',
			buttons : [{
				text:'是',
				elCls : 'button button-primary',
				handler : function(){
					this.close();
					colsePage();
				}
			},{
				text:'否',
				elCls : 'button',
				handler : function(){
					this.close();
				}
			}]
		});
	});
	
	$("#btn_withdraw").click(function() {
		BUI.Message.Show({
			title : '确认提示',
			msg : '您确定要撤回当前任务吗?',
			icon : 'question',
			buttons : [{
				text:'是',
				elCls : 'button button-primary',
				handler : function(){
					var data = AjaxUtil.command.custom("withdrawTaskDataHandler", {id: procInstID});
					if(AjaxUtil.command.isSucceed(data)) {
						this.close();
						colsePage();
					} else {
						BUI.Message.Show({
							msg : '任务撤回失败！',
							icon : 'info',
							buttons : [],
							autoHide : true,
							autoHideDelay : 1000
						});
					}
				}
			},{
				text:'否',
				elCls : 'button',
				handler : function(){
					this.close();
				}
			}]
		});
	});
	
	$("#btn_discard").click(function() {
		BUI.Message.Show({
			title : '确认提示',
			msg : '您确定要将改流程作废吗?',
			icon : 'question',
			buttons : [{
				text:'是',
				elCls : 'button button-primary',
				handler : function(){
					var data = AjaxUtil.command.custom("discardProcessInstanceDataHandler", {ids: [procInstID]});
					if(AjaxUtil.command.isSucceed(data)) {
						this.close();
						colsePage();
					} else {
						BUI.Message.Show({
							msg : '流程作废失败！',
							icon : 'info',
							buttons : [],
							autoHide : true,
							autoHideDelay : 1000
						});
					}
				}
			},{
				text:'否',
				elCls : 'button',
				handler : function(){
					this.close();
				}
			}]
		});
	});
	
	saveSubmit = saveSubmitHandler;
	function saveSubmitHandler(transition_name) {
		//调用表单保存
		var businessID = null;
		if($("#frame_content_" + nodeId).length > 0){
			var wfFormSaveFunc = $("#frame_content_" + nodeId)[0].contentWindow.wfFormSave;
			if(typeof(wfFormSaveFunc) == "function"){
				businessID = wfFormSaveFunc();
			}
		} else {
			businessID = "";
		}
		
		//任务信息保存
		if(businessID == null) return;
		
		//提交到用户ID
		var userId = $('#assignee').val();
		//结果(流转名称)
		var outcome = transition_name ? transition_name : $('#transition').val();
		var params = {
			assignee: userId
		};
		
		var data = null;
		if(isApply) {
			//流程创建
			data = AjaxUtil.command.startProcess(procDefID, businessID, $('#opinion').val(), outcome, params);
		} else {
			//完成当前任务
			data = AjaxUtil.command.completeTask(taskId, businessID, $('#opinion').val(), outcome, params);
		}
		if(AjaxUtil.command.isSucceed(data)) {
			colsePage();
		} else {
			BUI.Message.Show({
				msg : '提交失败！',
				icon : 'info',
				buttons : [],
				autoHide : true,
				autoHideDelay : 1000
			});
		}
	}
	
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
	
	function userSelectInit() {
		if(transitions!=null && transitions.length>0 && users!=null && users.length>0) {
			var tname = '';
			if(transitions.length == 1) {
				tname = transitions[0].name;
			} else {
				tname = $("#transition").val();
			}
			
			var ops = '';
			for(var i=0; i<users.length; i++) {
				if(users[i].transition == tname) {
					ops += '<option value="' + users[i].userID + '">' + users[i].realName + ' (' + users[i].userName + ')' + '</option>';
				}
			}
			
			$('#assignee').empty();
			if(ops == '') {
				$('#assignee').hide();
			} else {
				$('#assignee').show();
				$('#assignee').append(ops);
			}
		}
	}
});

function getFormsBusinessId() {
	return busForm;
}

function reinitIframe(ifid) {
	var iframe = document.getElementById(ifid);
	try{
		var bHeight = iframe.contentWindow.document.body.scrollHeight;
		var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
		var height = Math.max(bHeight, dHeight);
		iframe.height =  height;
	}catch (ex){}
}

function reinitAllIframe() {
	$('iframe[id^="frame_content_"]').each(function( index ) {
		this.height = 100;
		reinitIframe($(this).attr("id"));
	});
}