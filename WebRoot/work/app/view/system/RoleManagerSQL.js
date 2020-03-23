Ext.define("XTFrame.view.system.RoleManagerSQL",{
	extend: 'Ext.grid.Panel',
	alias: 'widget.systemRoleManagerSQL',
	frame: true,
	autoScroll: true,
	enableKeyNav: true,
	title: 'SQL权限',
	columns: [ Ext.create("Ext.grid.RowNumberer", {width:32}),
				{width: 220, text: 'SQL编号', dataIndex: 'sqlid', sortable: true}, 
				{width: 160, text: 'SQL名称', dataIndex: 'sqlname'},
				{width: 160, text: '备注', dataIndex: 'remark'} ],
	initComponent:function(){
		Ext.create('XTFrame.store.SQL', {storeId: 's_rolesql',
			autoLoad: false,
			listeners:{
				beforeload: function(store, options){
					var new_params = {
						iFunc: ajaxUtil.FUNC_PAGING,
						strData: Ext.JSON.encode({sqlID: "xtframe_sql_manage_1", parameters: {sqlid: "", dbtype: "", modid: 0}, offset: options.start, maxsize: options.limit})
					};
			        Ext.apply(store.proxy.extraParams, new_params);
			    },
			    load: function(store, records, successful){
			    	if(successful){
			    		ajaxUtil.isLogin(store.proxy.reader.jsonData);
			    	}
			    }
			}
		});
		this.roleText = Ext.create('Ext.toolbar.TextItem');
		Ext.apply(this,{
			store: Ext.data.StoreManager.lookup('s_rolesql'),
			selType: 'checkboxmodel',
			multiSelect: true,
			roleid: '',
			bInit: false,
			roleData: null,
			roleDataNew: null,
			tbar: [ {xtype: 'tbtext', text:"<img src='/work/resources/images/icons/fam/user_edit.png' border='0'>&nbsp;&nbsp;&nbsp;设置角色:"},
					this.roleText,
					{xtype: 'tbfill'},
					{xtype: 'button', text: '保存', action: 'saveRole', iconCls: 'icon-save'},
					{xtype: 'button', text: '重置', action: 'resetRole', iconCls: 'icon-reset'}],
			dockedItems: [{
				xtype: 'pagingtoolbar',
				dock: 'bottom',
				displayInfo: true,
				store: Ext.data.StoreManager.lookup('s_rolesql')
			}]
		});
		this.callParent(arguments);
	}
});