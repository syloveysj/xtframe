Ext.define("XTFrame.view.system.RoleManagerLogic",{
	extend: 'Ext.grid.Panel',
	alias: 'widget.systemRoleManagerLogic',
	frame: true,
	autoScroll: true,
	enableKeyNav: true,
	title: '逻辑权限',
	columns: [ Ext.create("Ext.grid.RowNumberer", {width:32}),
				{width: 220, text: '逻辑编号', dataIndex: 'logicid', sortable: true}, 
				{width: 160, text: '逻辑名称', dataIndex: 'logicname'},
				{width: 160, text: '备注', dataIndex: 'remark'} ],
	initComponent:function(){
		Ext.create('XTFrame.store.Logic', {storeId: 's_rolelogic',
			autoLoad: false,
			listeners:{
				beforeload: function(store, options){
					var new_params = {
						iFunc: ajaxUtil.FUNC_PAGING,
						strData: Ext.JSON.encode({sqlID: "xtframe_logic_manage_1", parameters: {logicid: ""}, offset: options.start, maxsize: options.limit})
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
			store: Ext.data.StoreManager.lookup('s_rolelogic'),
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
				store: Ext.data.StoreManager.lookup('s_rolelogic')
			}]
		});
		this.callParent(arguments);
	}
});