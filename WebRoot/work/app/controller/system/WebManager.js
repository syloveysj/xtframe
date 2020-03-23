Ext.define('XTFrame.controller.system.WebManager', {
	extend: 'Ext.app.Controller',
	init: function(){
		this.control({
			'systemWebManagerPage': {
				itemclick: function(tree, record, item, index, e){
					var layout = tree.up('panelBorder');
					var grid1 = layout.down('systemWebManagerData');
					var grid2 = layout.down('systemWebManagerDetails');
					var id = record.raw ? record.raw.id : record.data.id;
					if(id=='0' || id==grid1.pageid) return ;
					
					grid1.pageText.setText("<font color='green'>"+record.data.text+"</font>");
					grid1.pageid = id;
					grid1.getStore().loadPage(1);
					
					grid2.dataText.setText("");
					grid2.defid = '';
					grid2.getStore().loadPage(1);
				},
				initcomplete: function(tree){
					this.refreshMenu(tree);
				},
				itemcontextmenu: function(view, record, item, index, event){
					event.preventDefault();
					var menu = viewFactory.getWindow('systemWebPageMenu', 'XTFrame.view.system.WebPageMenu');
			        view.select();
			        menu.showAt(event.getXY());
				}
			},
			'systemWebManagerPage tool[type=refresh]': {
				click: function(o, e){
					this.refreshMenu(o.up('systemWebManagerPage'));
				}
			},
			'systemWebPageMenu menuitem[action=optTree]': {
				click: function(o, e){
					var tree = pubOPT.getMainView().down('systemWebManagerPage');
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
						this.deletePage(tree, data.pageidpath);
					} else {
						var win = viewFactory.getWindow('systemWebPageEditWindow', 'XTFrame.view.system.WebPageEditWindow');
						win.flag = o.command;
						win.show();
						var panel = win.down('form');
						var form = panel.getForm();
						form.reset();
						form.findField("pagepid").setValue(data.pageid ? data.pageid : 0);
						form.findField("pageidpath").setValue(data.pageidpath ? data.pageidpath : "");
						if(o.command=='edit') {
							form.findField("pageid").setValue(data.pageid ? data.pageid : 0);
							form.findField("pagename").setValue(data.pagename ? data.pagename : "");
							form.findField("sortno").setValue(data.sortno ? data.sortno : "");
							form.findField("remark").setValue(data.remark ? data.remark : "");
							form.findField("ablecache").setValue(data.ablecache ? data.ablecache+"" : "0");
							form.findField("pagetemplettype").setValue(data.pagetemplettype ? data.pagetemplettype : "");
							form.findField("pagetempletpath").setValue(data.pagetempletpath ? data.pagetempletpath : "");
							form.findField("errorpagetemplettype").setValue(data.errorpagetemplettype ? data.errorpagetemplettype : "");
							form.findField("errorpagetempletpath").setValue(data.errorpagetempletpath ? data.errorpagetempletpath : "");
							form.findField("pagelevel").setValue(data.pagelevel ? data.pagelevel : "");
						}
					}
				}
			},
			'systemWebPageEditWindow button[action=editSave]': {
				click: function(button, e){
					var tree = pubOPT.getMainView().down('systemWebManagerPage');
					var formPanel = button.up('form');
					var win = button.up('window');
					this.editPage(tree, win, formPanel);
				}
			},
			'systemWebPageEditWindow button[action=editCancel]': {
				click: function(button, e){
					var win = button.up('window');
					win.hide();
				}
			},
			'systemWebManagerData': {
				beforeupdate: function(grid, win, mark, opt){
					if(mark == 'editsave'){
						if(win.flag == 'add'){
							var serverData = ajaxUtil.serverData("regid", "seq_defid");
							if(!ajaxUtil.isSucceed(serverData)){
								Ext.xtframe.msg("提示", "保存失败！");
								opt.flag = false;
								return;
							}
							var panel = win.down('form');
							var form = panel.getForm();
							form.findField("pageid").setValue(grid.pageid);
							form.findField("defid").setValue(serverData.data);
						}
					} else if(mark == 'add') {
						if(grid.pageid.length < 2) {
							Ext.xtframe.msg("提示", "当前不容许添加！");
							opt.flag = false;
							return;
						}
					}
				},
				itemclick: function(grid, record, item, index, e, eOpts){
					var layout = grid.up('panelBorder');
					var grid2 = layout.down('systemWebManagerDetails');
					if(record.data.defid == grid2.defid) return ;
					
					grid2.dataText.setText("<font color='green'>"+record.data.dataname+"</font>");
					grid2.defid = record.data.defid;
					grid2.getStore().loadPage(1);
				}
			},
			'systemWebManagerDetails': {
				beforeupdate: function(grid, win, mark, opt){
					if(mark == 'editsave'){
						if(win.flag == 'add'){
							var serverData = ajaxUtil.serverData("regid", "seq_detid");
							if(!ajaxUtil.isSucceed(serverData)){
								Ext.xtframe.msg("提示", "保存失败！");
								opt.flag = false;
								return;
							}
							var panel = win.down('form');
							var form = panel.getForm();
							form.findField("defid").setValue(grid.defid);
							form.findField("detid").setValue(serverData.data);
						}
					} else if(mark == 'add') {
						if(grid.defid.length < 1) {
							Ext.xtframe.msg("提示", "当前不容许添加！");
							opt.flag = false;
							return;
						}
					}
				}
			}
		});
	},
	refreshMenu: function(tree){
		var data, treeData = ajaxUtil.executeQuery('xtframe_web_manage_1', {});
		if(!ajaxUtil.isSucceed(treeData)){
			Ext.xtframe.msg("提示", "模块数据获取失败！");
		} else {
			data = pubOPT.treeNodeUnil(treeData.rows, undefined, 
				{menuId: 'pageid', menuName: 'pagename', menuLevel: 'pagelevel', menuIdPath: 'pageidpath'});
			tree.getRootNode().removeAll(false);
			if(data.length > 0) {
				tree.getRootNode().appendChild(data);
				tree.expandAll();
			}
		}
	},
	editPage: function(tree, win, formPanel){
		var form = formPanel.getForm();
		var formObject = form.getValues();
		var arrValue = pubOPT.getFormValues(formObject, ['pageid', 'pagename', 'pagepid', 'pageidpath', 'pagelevel', 'remark', 'ablecache', 'sortno', 'pagetemplettype', 'pagetempletpath', 'errorpagetemplettype', 'errorpagetempletpath']);
		var me = this;
		if(win.flag == 'add') {
			var serverData = ajaxUtil.serverData("regid", "seq_pageid");
			if(ajaxUtil.isSucceed(serverData)){
				arrValue.pageid = 'XT'+(100000+serverData.data);
				arrValue.pageidpath = arrValue.pageidpath+arrValue.pageid+".";
				arrValue.pagelevel = pubOPT.getStrCount(arrValue.pageidpath,".");
			} else {
				Ext.xtframe.msg("提示", "保存失败！");
				return;
			}
			
			Ext.get(formPanel.getId()).mask('请稍后...');
			ajaxUtil.executeUpdate('xtframe_web_manage_10', arrValue, {
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
			ajaxUtil.executeUpdate('xtframe_web_manage_11', arrValue, {
				async: true,
				success: function(data) {
					Ext.get(formPanel.getId()).unmask();
					if(ajaxUtil.isSucceed(data)){
						me.refreshMenu(tree);
						tree.getSelectionModel().select(tree.getRootNode());
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
	deletePage: function(tree, pageidpath){
		var me = this;
		Ext.MessageBox.confirm('确认删除', '你真的要删除所选记录吗?',
			function(btn){
				if(btn == 'yes') {
					var arrValue = new Array();
					arrValue.push({
							sqlID: 'xtframe_web_manage_12',
							parameters: {pageidpath: pageidpath}
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