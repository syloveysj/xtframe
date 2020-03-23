Ext.define('XTFrame.controller.workflow.ProcessDefinitionManager', {
	extend: 'Ext.app.Controller',
	init: function(){
		this.control({
			'workflowProcessDefinitionManagerTree': {
				uploadsuccess: function(win, data, action){
					win.close();
					this.refreshTree(win.parentView);
					Ext.xtframe.msg("提示", "流程定义部署成功！");
				},
				initcomplete: function(tree){
					this.refreshTree(tree);
				},
				itemdblclick: function(tree, record, item, index, e){
					if(record.isLeaf()){
						var panel = tree.up('panelBorder');
						var grid = panel.down('workflowProcessDefinitionManagerGrid');
						this.refreshGrid(grid, record.data.id);
					}
				}
			},
			'workflowProcessDefinitionManagerTree button[action=uploadDeploy]': {
				click: function(button, e){
					var pmd = button.up('workflowProcessDefinitionManagerTree');
					var win = viewFactory.getWindow('uploadDeploy', 'XTFrame.view.UploadFile');
					win.parentView = pmd;
					win.title = "流程定义部署";
					win.uploadUrl = '/server/deploy.do';
					win.show();
				}
			},
			'workflowProcessDefinitionManagerTree button[action=startProcess]': {
				click: function(button, e){
					var tree = button.up('workflowProcessDefinitionManagerTree');
					var nodes = tree.getChecked();
					if(nodes.length == 1){
						var data = ajaxUtil.startProcess(nodes[0].data.id);
						if(ajaxUtil.isSucceed(data)){
							Ext.xtframe.msg("提示", "开启流程成功！");
						} else {
							Ext.xtframe.msg("提示", "开启流程失败！");
						}
					} else {
						Ext.xtframe.msg("提示", "请选择一个流程定义！");
					}
				}
			},
			'workflowProcessDefinitionManagerTree button[action=seeDefinition]': {
				click: function(button, e){
					var tree = button.up('workflowProcessDefinitionManagerTree');
					var nodes = tree.getChecked();
					if(nodes.length == 1){
						var data = nodes[0].data;
						var viewData = ajaxUtil.processView(1, data.id);
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
							view.setSrc('/server/processDefinitionImage.do?id='+data.id);
							view.removeDraw();
						}
					} else {
						Ext.xtframe.msg("提示", "请选择一个流程定义！");
					}
				}
			},
			'workflowProcessDefinitionManagerTree button[action=setting]': {
				click: function(button, e){
					var tree = button.up('workflowProcessDefinitionManagerTree');
					var nodes = tree.getChecked();
					if(nodes.length == 1){
						var win = viewFactory.getWindow('processSettingWindow', 'XTFrame.view.workflow.ProcessSettingWindow');
						win.processRecord = nodes[0].data;
						win.show();
					} else {
						Ext.xtframe.msg("提示", "请选择一个流程定义！");
					}
				}
			},
			'workflowProcessDefinitionManagerTree button[action=deployDelete]': {
				click: function(button, e){
					var me = this,
						tree = button.up('workflowProcessDefinitionManagerTree'),
						nodes = tree.getChecked();
					if(nodes.length >= 1){
						Ext.MessageBox.confirm('确认删除', '你真的要删除所选记录吗?',
							function(btn){
								if(btn == 'yes') {
									Ext.Array.each(nodes, function(node){
										ajaxUtil.deleteDeployment(node.data.deploymentId);
									});
									me.refreshTree(tree);
							}});
					} else {
						Ext.xtframe.msg("提示", "请选择要删除的流程定义！");
					}
				}
			},
			'workflowProcessDefinitionManagerTree button[action=refresh]': {
				click: function(button, e){
					this.refreshTree(button.up('workflowProcessDefinitionManagerTree'));
				}
			}
		});
	},
	refreshTree: function(tree){
		var pdData = ajaxUtil.processDefinitionList();
		if(ajaxUtil.isSucceed(pdData)){
			var rootList = new Array(), flag;
			Ext.Array.each(pdData.arrData, function(o){
				o.leaf = true;
				o.checked = false;
				flag = true;
				Ext.Array.each(rootList, function(t){
					if(t.id == o.name){
						flag = false;
						t.children.push(o);
						return false;
					}
				});
				if(flag){
					rootList.push({
						id: o.name,
						deploymentId: '',
						name: o.name,
						version: '',
						children: [o]
					});
				}
			});
			tree.getRootNode().removeAll(true);
			tree.getRootNode().appendChild(rootList);
			tree.expandAll();
		} else {
			Ext.xtframe.msg("提示", "流程定义数据获取失败！");
		}
	},
	refreshGrid: function(grid, id){
		grid.pdid = id;
		grid.getStore().load();
	}
});