Ext.define("XTFrame.view.system.RoleManagerUser",{
	extend: 'Ext.grid.Panel',
	alias: 'widget.systemRoleManagerUser',
	frame: true,
	autoScroll: true,
	enableKeyNav: true,
	title: '用户列表',
	columns: [ Ext.create("Ext.grid.RowNumberer", {width:32}),
				{width: 320, text: '用户编号', dataIndex: 'userid', sortable: true}, 
				{width: 160, text: '用户名称', dataIndex: 'username'} ],
	initComponent:function(){
		var me = this;
		Ext.create('XTFrame.store.RoleUser', {storeId: 's_roleuser',
			listeners:{
				beforeload: function(store, options){
					var new_params = {
						iFunc: ajaxUtil.FUNC_PAGING,
						strData: Ext.JSON.encode({sqlID: "xtframe_role_user_0", parameters: {roleid: me.roleid}, offset: options.start, maxsize: options.limit})
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
			store: Ext.data.StoreManager.lookup('s_roleuser'),
//			selType: 'checkboxmodel',
//			multiSelect: true,
			roleid: '',
			bInit: true,
			tbar: [ {xtype: 'tbtext', text:"<img src='/work/resources/images/icons/fam/user_edit.png' border='0'>&nbsp;&nbsp;&nbsp;设置角色:"},
					this.roleText],
			dockedItems: [{
				xtype: 'pagingtoolbar',
				dock: 'bottom',
				displayInfo: true,
				store: Ext.data.StoreManager.lookup('s_roleuser')
			}]
		});
		this.callParent(arguments);
	}
});