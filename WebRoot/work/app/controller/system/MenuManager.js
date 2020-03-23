Ext.define('XTFrame.controller.system.MenuManager', {
	extend: 'Ext.app.Controller',
	init: function(){
		this.control({
			'systemMenuManagerTree': {
				itemclick: function(tree, record, item, index, e){
					var layout = tree.up('panelBorder');
					var grid = layout.down('systemMenuManagerGrid');
//					console.log(record.raw);
					grid.menuid = record.raw ? record.raw.menuid : record.data.menuid;
					grid.menuidpath = record.raw ? record.raw.menuidpath : record.data.menuidpath;
					grid.getStore().loadPage(1);
				},
				initcomplete: function(tree){
					this.refreshMenu(tree);
				}
			},
			'systemMenuManagerTree tool[type=refresh]': {
				click: function(o, e){
					this.refreshMenu(o.up('systemMenuManagerTree'));
				}
			},
			'systemMenuManagerGrid': {
				beforeupdate: function(grid, win, mark, opt){
					if(mark == 'editsave'){
						this.gridEditSaveClick(grid, win, mark, opt);
					}
				},
				update: function (grid, flag){
					var layout = grid.up('panelBorder');
					this.refreshMenu(layout.down('systemMenuManagerTree'));
				}
			}
		});
	},
	gridEditSaveClick: function(grid, win, mark, opt){
		var panel = win.down('form');
		var form = panel.getForm();
		if(win.flag == 'add'){
			var serverData = ajaxUtil.serverData("regid", "seq_menuid");
			if(ajaxUtil.isSucceed(serverData)){
				var menuid = serverData.data;
				var menuidpath = grid.menuidpath+menuid+".";
				var menulevel = pubOPT.getStrCount(menuidpath,".");
				form.findField("menuid").setValue(menuid);
				form.findField("menupid").setValue(grid.menuid);
				form.findField("menuidpath").setValue(menuidpath);
				form.findField("menulevel").setValue(menulevel);
			} else {
				Ext.xtframe.msg("提示", "保存失败！");
				opt.flag = false;
			}
		}
	},
	refreshMenu: function(tree){
		var data, menuData = ajaxUtil.executeQuery('xtframe_menu_manage_1', {});
		if(!ajaxUtil.isSucceed(menuData)){
			Ext.xtframe.msg("提示", "菜单数据获取失败！");
		} else {
			data = pubOPT.treeNodeUnil(menuData.rows, undefined, 
				{menuId: 'menuid', menuName: 'menuname', menuLevel: 'menulevel', menuIdPath: 'menuidpath', iconCls: 'menuicon'});
			tree.getRootNode().removeAll(false);
			if(data.length > 0) {
				tree.getRootNode().appendChild(data);
				tree.expandAll();
			}
		}
	}
});