Ext.define("XTFrame.view.system.DictionaryManagerLeft",{
	extend: 'Ext.grid.Panel',
	alias: 'widget.systemDictionaryManagerLeft',
	region: 'west',
	width: 412,
	frame: true,
	autoScroll: true,
	enableKeyNav: true,
	columns: [ Ext.create("Ext.grid.RowNumberer", {width:32}),
				{width: 140, text: '字典编码', dataIndex: 'dicid'}, 
				{width: 160, text: '分类名称', dataIndex: 'dicname'} ],
	tbar: [ {xtype: 'button', text: '添加', action: 'gridAdd', iconCls: 'icon-add'},
			{xtype: 'button', text: '删除', action: 'gridDelete', iconCls: 'icon-delete'},
			{xtype: 'button', text: '修改', action: 'gridEdit', iconCls: 'icon-edit'},
			{xtype: 'button', text: '字典查看', action: 'lookList', iconCls: 'icon-grid'} ],
	initComponent: function(){
		var me = this;
		Ext.create('XTFrame.store.Dictionary', {storeId: 's_dictionary_left',
			listeners:{
				beforeload: function(store, options){
					var new_params = {
						iFunc: ajaxUtil.FUNC_PAGING,
						strData: Ext.JSON.encode({sqlID: "xtframe_dictionary_manage_1", parameters: {}, offset: options.start, maxsize: options.limit})
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
			store: Ext.data.StoreManager.lookup('s_dictionary_left'),
			selType: 'checkboxmodel',
			multiSelect: true,
			editWindow: 'XTFrame.view.system.DictionaryEditWindow',
			editWinId: 'dictionaryEditWindow',
			addSql: 'xtframe_dictionary_manage_3',
			addValues: ['dicid', 'dicname', 'dicvalue', 'dicpid'],
			editSql: 'xtframe_dictionary_manage_4',
			editValues: ['dicid', 'dicname', 'dicvalue', 'dicpid'],
			deleteSql: 'xtframe_dictionary_manage_5',
			deleteValues: ['dicid'],
			dockedItems: [{
				xtype: 'pagingtoolbar',
				dock: 'bottom',
				displayInfo: true,
				store: Ext.data.StoreManager.lookup('s_dictionary_left')
			}]
		});
		this.addEvents({'beforeupdate': true});
		this.callParent(arguments);
	}
});