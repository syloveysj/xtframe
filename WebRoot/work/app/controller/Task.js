Ext.define('XTFrame.controller.Task', {
	extend: 'Ext.app.Controller',
	init: function(){
		this.control({
			'button[action=taskSave]': {
				click: this.taskSaveClick
			},
			'button[action=taskSubmit]': {
				click: this.taskSubmitClick
			},
			'button[action=taskCancel]': {
				click: this.taskCancelClick
			},
			'button[action=gridProcessView]': {
				click: this.gridProcessViewClick
			}
		});
	},
	taskSaveClick: function(button){
		var baseForm = button.up('workflowBaseForm');
		if(!Ext.isEmpty(baseForm.parentView)){
			baseForm.parentView.fireEvent('tasksave', baseForm);
		}
	},
	taskSubmitClick: function(button){
		var baseForm = button.up('workflowBaseForm');
		var opt = {flag: true};
		if(!Ext.isEmpty(baseForm.parentView)){
			baseForm.parentView.fireEvent('beforetasksubmit', baseForm.parentView, baseForm, opt);
			if(!opt.flag) return ;
		}
//		console.log(baseForm);
		if(!Ext.isEmpty(baseForm.taskId) && !Ext.isEmpty(baseForm.pageId)){
			var panel = baseForm.down('form');
			var form = panel.getForm();
			var formObject = form.getValues();
			var data = ajaxUtil.completeTask(baseForm.taskId, baseForm.pageId, formObject.opinion, formObject.outcome, opt.variables);
			if(ajaxUtil.isSucceed(data)){
				if(!Ext.isEmpty(baseForm.gridView)){
					baseForm.gridView.fireEvent('tasksubmit', baseForm.gridView, baseForm, opt, data);
				}
				if(!Ext.isEmpty(baseForm.parentView)){
					baseForm.parentView.fireEvent('tasksubmit', baseForm.parentView, baseForm, opt, data);
				}
				Ext.xtframe.msg("提示", "任务提交成功");
				if(baseForm.isWindow == true){
					baseForm.up('window').close();
				}
			} else {
				Ext.xtframe.msg("提示", "任务提交失败");
			}
		} else {
			Ext.xtframe.msg("失败", "未设置任务或表单编号！");
		}
	},
	gridProcessViewClick: function(button){
		if(!Ext.isEmpty(button.viewType) && !Ext.isEmpty(button.viewKey)){
			var grid = button.up('grid');
			var opt = {flag: true,
				viewType: button.viewType
			};
			grid.fireEvent('beforeview', grid, opt);
			if(!opt.flag) return ;
			
			var rows = grid.getSelectionModel().getSelection();
			if(rows.length == 1){
				var key = rows[0].data[button.viewKey],
					type,
					url;
				switch(button.viewType){
					case 'definition': 
						type = 1;
						url = '/server/processDefinitionImage.do';
						break;
					case 'instance': 
						type = 2; 
						url = '/server/processInstanceImage.do';
						break;
					case 'task': 
						type = 3; 
						url = '/server/taskImage.do';
						break;
				}
				var viewData = ajaxUtil.processView(type, key);
				if(ajaxUtil.isSucceed(viewData)){
					var view, win = viewFactory.getComponent('processViewWindow');
					if(win == null){
						view = Ext.create('XTFrame.view.workflow.ProcessView');
						win = Ext.create('Ext.window.Window', {
						    title: '流程图',
						    width: 500,
							height: 400,
							closeAction: 'hide',
							layout: 'fit',
							autoScroll: true,
							maximizable: true,
							view: view,
						    items: [view]
						});
						viewFactory.addComponent('processViewWindow', win);
					}
					view = win.view;
					win.show();
					win.setWidth(viewData.retData.imgWidth+12);
					win.setHeight(viewData.retData.imgHeight+34);
					view.setWidth(viewData.retData.imgWidth);
					view.setHeight(viewData.retData.imgHeight);
					view.setSrc(url+'?id='+key);
					if(type != 1){
						view.setDrawComponent(viewData.retData.x, viewData.retData.y, viewData.retData.width, viewData.retData.height);
					}
					
					grid.fireEvent('view', grid, win, opt);
				} else {
					Ext.xtframe.msg("提示", "流程图打开失败");
				}
			} else {
				Ext.xtframe.msg("提示", "请您选择一条记录");
			}
		}
	},
	taskCancelClick: function(button){
		var win = button.up('window');
		win.close();
	}
});