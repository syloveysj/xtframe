Ext.define('XTFrame.controller.system.OrganManager', {
	extend: 'Ext.app.Controller',
	init: function(){
		this.control({
			'systemOrganManagerTree': {
				itemclick: function(tree, record, item, index, e){
					var layout = tree.up('panelBorder');
					var grid = layout.down('systemOrganManagerGrid');
					grid.orgidpath = record.raw ? record.raw.orgidpath : record.data.orgidpath;
					grid.orgid = record.raw ? record.raw.orgid : record.data.orgid;
					grid.getStore().loadPage(1);
				},
				initcomplete: function(tree){
					this.refreshOrgan(tree);
				}
			},
			'systemOrganManagerTree tool[type=refresh]': {
				click: function(o, e){
					this.refreshOrgan(o.up('systemOrganManagerTree'));
				}
			},
			'systemOrganManagerGrid': {
				beforeupdate: function(grid, win, mark, opt){
					if(mark == 'editsave'){
						this.gridEditSaveClick(grid, win, mark, opt);
					}
				},
				update: function (grid, flag){
					var layout = grid.up('panelBorder');
					this.refreshOrgan(layout.down('systemOrganManagerTree'));
				}
			}
		});
	},
	gridEditSaveClick: function(grid, win, mark, opt){
		var panel = win.down('form');
		var form = panel.getForm();
		if(win.flag == 'add'){
			var serverData = ajaxUtil.serverData("regid", "seq_orgid");
			if(ajaxUtil.isSucceed(serverData)){
				var orgid = serverData.data;
				var orgidpath = grid.orgidpath+orgid+".";
				var orglevel = pubOPT.getStrCount(orgidpath,".");
				form.findField("orgid").setValue(orgid);
				form.findField("orgidpath").setValue(orgidpath);
				form.findField("orgpid").setValue(grid.orgid);
				form.findField("orglevel").setValue(orglevel);
			} else {
				Ext.xtframe.msg("提示", "保存失败！");
				opt.flag = false;
			}
		}
	},
	refreshOrgan: function(tree){
		var data, orgData = ajaxUtil.executeQuery('xtframe_org_manage_1', {orgidpath:""});
		if(!ajaxUtil.isSucceed(orgData)){
			Ext.xtframe.msg("提示", "机构数据获取失败！");
		} else {
			data = pubOPT.treeNodeUnil(orgData.rows, undefined, 
				{menuId: 'orgid', menuName: 'orgname', menuLevel: 'orglevel', menuIdPath: 'orgidpath'});
			tree.getRootNode().removeAll(false);
			if(data.length > 0) {
				tree.getRootNode().appendChild(data);
				tree.expandAll();
			}
		}
	}
});