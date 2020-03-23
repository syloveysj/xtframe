Ext.define('XTFrame.controller.system.SQLManager', {
	extend: 'Ext.app.Controller',
	init: function(){
		this.control({
			'systemSQLModuleTree': {
				itemclick: function(tree, record, item, index, e){
					var layout = tree.up('panelBorder');
					var grid = layout.down('systemSQLManager');
//					console.log(record.data);
					grid.moduleText.setText("<font color='green'>"+record.data.text+"</font>");
					grid.modid = record.raw ? record.raw.id : record.data.id;
					grid.getStore().loadPage(1);
				},
				initcomplete: function(tree){
					this.refreshMenu(tree);
				},
				itemcontextmenu: function(view, record, item, index, event){
					event.preventDefault();
					var menu = viewFactory.getWindow('systemSQLModuleTree', 'XTFrame.view.system.SQLTreeMenu');
			        view.select();
			        menu.showAt(event.getXY());
				}
			},
			'systemSQLModuleTree tool[type=refresh]': {
				click: function(o, e){
					this.refreshMenu(o.up('systemSQLModuleTree'));
				}
			},
			'systemSQLTreeMenu menuitem[action=optTree]': {
				click: function(o, e){
					var tree = pubOPT.getMainView().down('systemSQLModuleTree');
					var rows = tree.getSelectionModel().getSelection();
					if(rows.length < 1) {
						Ext.xtframe.msg("提示", "没有选择的节点！");
						return ;
					}
					var data = rows[0].raw;
					if((o.command=='delete' || o.command=='edit') && '0'==data.id) {
						Ext.xtframe.msg("提示", "根节点不容许编辑或删除！");
						return ;
					}
					if(o.command=='delete') {
						this.deleteModule(tree, data.modidpath);
					} else {
						var win = viewFactory.getWindow('systemSQLModuleEditWindow', 'XTFrame.view.system.SQLModuleEditWindow');
						win.flag = o.command;
						win.show();
						var panel = win.down('form');
						var form = panel.getForm();
						form.reset();
						form.findField("modpid").setValue(data.modid ? data.modid : 0);
						form.findField("modidpath").setValue(data.modidpath ? data.modidpath : "");
						form.findField("state").setValue(data.sortno ? data.sortno : "1");
						if(o.command=='edit') {
							form.findField("modid").setValue(data.modid ? data.modid : 0);
							form.findField("modname").setValue(data.modname ? data.modname : "");
							form.findField("sortno").setValue(data.sortno ? data.sortno : "");
							form.findField("remark").setValue(data.remark ? data.remark : "");
							form.findField("state").setValue(data.state ? data.state : "1");
							form.findField("modlevel").setValue(data.modlevel ? data.modlevel : "");
						}
					}
				}
			},
			'systemSQLModuleEditWindow button[action=editSave]': {
				click: function(button, e){
					var tree = pubOPT.getMainView().down('systemSQLModuleTree');
					var formPanel = button.up('form');
					var win = button.up('window');
					this.editModule(tree, win, formPanel);
				}
			},
			'systemSQLModuleEditWindow button[action=editCancel]': {
				click: function(button, e){
					var win = button.up('window');
					win.hide();
				}
			},
			'systemSQLManager': {
				beforeupdate: function(grid, win, mark, opt){
					if(mark == 'editsave'){
						if(win.flag == 'add'){
							var panel = win.down('form');
							var form = panel.getForm();
							form.findField("modid").setValue(grid.modid);
						}
					}
				}
			}
		});
	},
	refreshMenu: function(tree){
		var data, treeData = ajaxUtil.executeQuery('xtframe_sql_module_1', {});
		if(!ajaxUtil.isSucceed(treeData)){
			Ext.xtframe.msg("提示", "模块数据获取失败！");
		} else {
			data = pubOPT.treeNodeUnil(treeData.rows, undefined, 
				{menuId: 'modid', menuName: 'modname', menuLevel: 'modlevel', menuIdPath: 'modidpath'});
			tree.getRootNode().removeAll(false);
			if(data.length > 0) {
				tree.getRootNode().appendChild(data);
				tree.expandAll();
			}
		}
	},
	editModule: function(tree, win, formPanel){
		var form = formPanel.getForm();
		var formObject = form.getValues();
		var arrValue = pubOPT.getFormValues(formObject, ['modid', 'modname', 'modpid', 'modidpath', 'modlevel', 'remark', 'state', 'sortno']);
		var me = this;
		if(win.flag == 'add') {
			var serverData = ajaxUtil.serverData("regid", "seq_modid");
			if(ajaxUtil.isSucceed(serverData)){
				arrValue.modid = serverData.data;
				arrValue.modidpath = arrValue.modidpath+arrValue.modid+".";
				arrValue.modlevel = pubOPT.getStrCount(arrValue.modidpath,".");
			} else {
				Ext.xtframe.msg("提示", "保存失败！");
				return;
			}
			
			Ext.get(formPanel.getId()).mask('请稍后...');
			ajaxUtil.executeUpdate('xtframe_sql_module_2', arrValue, {
				async: true,
				success: function(data) {
					Ext.get(formPanel.getId()).unmask();
					if(ajaxUtil.isSucceed(data)){
						me.refreshMenu(tree);
						win.hide();
						Ext.xtframe.msg("提示", "保存成功！");
					}else{
						Ext.xtframe.msg("提示", "保存失败！");
					}
				},
				failure: function() {
					Ext.get(formPanel.getId()).unmask();
					Ext.xtframe.msg("提示", "保存失败！");
				}
			});
		} else if(win.flag == 'edit') {
			Ext.get(formPanel.getId()).mask('请稍后...');
			ajaxUtil.executeUpdate('xtframe_sql_module_3', arrValue, {
				async: true,
				success: function(data) {
					Ext.get(formPanel.getId()).unmask();
					if(ajaxUtil.isSucceed(data)){
						me.refreshMenu(tree);
						win.hide();
						Ext.xtframe.msg("提示", "编辑成功！");
					}else{
						Ext.xtframe.msg("提示", "编辑失败！");
					}
				},
				failure: function() {
					Ext.get(formPanel.getId()).unmask();
					Ext.xtframe.msg("提示", "编辑失败！");
				}
			});
		}
	},
	deleteModule: function(tree, modidpath){
		var me = this;
		Ext.MessageBox.confirm('确认删除', '你真的要删除所选记录吗?',
			function(btn){
				if(btn == 'yes') {
					var arrValue = new Array();
					arrValue.push({
							sqlID: 'xtframe_sql_module_4',
							parameters: {modidpath: modidpath}
						});
					Ext.get(tree.getId()).mask('请稍后...');
					ajaxUtil.executeTransaction(arrValue, {
						async: true,
						success: function(data) {
							Ext.get(tree.getId()).unmask();
							if(ajaxUtil.isSucceed(data)){
								me.refreshMenu(tree);
								Ext.xtframe.msg("提示", "删除成功！");
							}else{
								Ext.xtframe.msg("提示", "删除失败！");
							}
						},
						failure: function() {
							Ext.get(tree.getId()).unmask();
							Ext.xtframe.msg("提示", "删除失败！");
						}
					});
				}});
	}
});