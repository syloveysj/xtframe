Ext.define("XTFrame.view.system.RoleManagerRes",{
	extend: 'Ext.grid.Panel',
	alias: 'widget.systemRoleManagerRes',
	frame: true,
	autoScroll: true,
	enableKeyNav: true,
	title: '资源权限',
	columns: [ Ext.create("Ext.grid.RowNumberer", {width:32}),
				{width: 160, text: '资源名称', dataIndex: 'resname'},
				{width: 260, text: '资源定位', dataIndex: 'uri'}, 
				{width: 160, text: '备注', dataIndex: 'remark'} ],
	initComponent:function(){
		Ext.create('XTFrame.store.Res', {storeId: 's_roleres',
			autoLoad: false,
			listeners:{
				beforeload: function(store, options){
					var new_params = {
						iFunc: ajaxUtil.FUNC_PAGING,
						strData: Ext.JSON.encode({sqlID: "xtframe_res_manage_1", parameters: {resname: ""}, offset: options.start, maxsize: options.limit})
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
			store: Ext.data.StoreManager.lookup('s_roleres'),
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
				store: Ext.data.StoreManager.lookup('s_roleres')
			}]
		});
		this.callParent(arguments);
	}
});