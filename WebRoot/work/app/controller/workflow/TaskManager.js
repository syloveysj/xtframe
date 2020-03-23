Ext.define('XTFrame.controller.workflow.TaskManager', {
	extend: 'Ext.app.Controller',
	init: function(){
		this.control({
			'workflowTaskNewest': {
				tasksubmit: function (grid, baseForm, opt, data){
					this.refreshTask(grid);
				}
			},
			'workflowTaskNewest button[action=lookTask]': {
				click: function(button, e){
					var grid = button.up('workflowTaskNewest');
					var rows = grid.getSelectionModel().getSelection();
					if(rows.length == 1){
						var taskId = rows[0].data.id;
						var pageData = ajaxUtil.taskPage(taskId);
//						console.log(pageData);
						if(ajaxUtil.isSucceed(pageData)){
							// 生成任务表单页面  -- 开始
							var parameters = Ext.JSON.decode(pageData.retData.parameters);
							var viewList = [], extendForm;
							if(!Ext.isEmpty(parameters)){
								if(!Ext.isEmpty(parameters.url)){
									extendForm = Ext.create(parameters.url);
									viewList.push(extendForm);
								}
								if(!Ext.isEmpty(parameters.controller)) this.addController(parameters.controller);
							}
							var baseForm = Ext.create('XTFrame.view.workflow.BaseForm',{
								gridView: grid,
								parentView: extendForm,
								taskId: taskId,
								pageId: pageData.retData.pageId,
								isWindow: true
							});
							var historyView = Ext.create('XTFrame.view.workflow.HistoryView',{
								processInstanceId: pageData.retData.processInstanceId
							});
							viewList.push(baseForm);
							viewList.push(historyView);
							var win = Ext.create('XTFrame.view.workflow.BaseFormWindow', {
								items: viewList
							}).show();
							if(!Ext.isEmpty(parameters)) baseForm.setOutcome(parameters.outcomes);
							historyView.getStore().load();
							// 生成任务表单页面 -- 结束
						} else {
							Ext.xtframe.msg("提示", "任务查看失败");
						}
					} else {
						Ext.xtframe.msg("提示", "请您选择一个任务");
					}
				}
			},
			'workflowTaskNewest button[action=refresh]': {
				click: function(button, e){
					this.refreshTask(button.up('workflowTaskNewest'));
				}
			},
			'workflowTaskHistory button[action=lookTask]': {
				click: function(button, e){
					
				}
			}
		});
	},
	addController: function(name){
		pubOPT.getMainView().fireEvent('addcontroller', name);
	},
	refreshTask: function(grid){
		grid.getStore().load();
	}
});