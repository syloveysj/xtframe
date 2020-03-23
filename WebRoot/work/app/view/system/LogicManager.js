Ext.define("XTFrame.view.system.LogicManager",{
	extend: 'Ext.grid.Panel',
	region: 'center',
	frame: true,
	autoScroll: true,
	enableKeyNav: true,
	columns: [ Ext.create("Ext.grid.RowNumberer", {width:32}),
				{width: 220, text: '逻辑编号', dataIndex: 'logicid', sortable: true}, 
				{width: 160, text: '逻辑名称', dataIndex: 'logicname'}, 
				{width: 60, text: '序号', dataIndex: 'sortno', sortable: true}, 
				{width: 160, text: '备注', dataIndex: 'remark'} ],
	tbar: [ {xtype: 'button', text: '添加', action: 'gridAdd', iconCls: 'icon-add'},
			{xtype: 'button', text: '删除', action: 'gridDelete', iconCls: 'icon-delete'},
			{xtype: 'button', text: '修改', action: 'gridEdit', iconCls: 'icon-edit'},
			{xtype: 'button', text: '查询', action: 'gridSearch', iconCls: 'icon-search'} ],
	initComponent:function(){
		var me = this;
		Ext.create('XTFrame.store.Logic', {storeId: 's_logic',
			listeners:{
				beforeload: function(store, options){
					var new_params = {
						iFunc: ajaxUtil.FUNC_PAGING,
						strData: Ext.JSON.encode({sqlID: "xtframe_logic_manage_1", parameters: {logicid: me.logicid}, offset: options.start, maxsize: options.limit})
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
		Ext.apply(this,{
			store: Ext.data.StoreManager.lookup('s_logic'),
			selType: 'checkboxmodel',
			multiSelect: true,
			logicid: '',
			editWindow: 'XTFrame.view.system.LogicEditWindow',
			editWinId: 'logicEditWindow',
			searchWindow: 'XTFrame.view.system.LogicSearchWindow',
			searchWinId: 'logicSearchWindow',
			addSql: 'xtframe_logic_manage_3',
			addValues: ['logicid', 'logicname', 'sortno', 'remark'],
			editSql: 'xtframe_logic_manage_4',
			editValues: ['logicid', 'logicname', 'sortno', 'remark'],
			deleteSql: 'xtframe_logic_manage_2',
			deleteValues: ['logicid'],
			searchValues: ['logicid'],
			dockedItems: [{
				xtype: 'pagingtoolbar',
				dock: 'bottom',
				displayInfo: true,
				store: Ext.data.StoreManager.lookup('s_logic')
			}]
		});
		this.callParent(arguments);
	}
});