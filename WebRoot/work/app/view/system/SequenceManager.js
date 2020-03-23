Ext.define("XTFrame.view.system.SequenceManager",{
	extend: 'Ext.grid.Panel',
	region: 'center',
	frame: true,
	autoScroll: true,
	enableKeyNav: true,
	columns: [ Ext.create("Ext.grid.RowNumberer", {width:32}),
				{width: 140, text: '名称', dataIndex: 'name', sortable: true}, 
				{width: 160, text: '当前值', dataIndex: 'currval', sortable: true}, 
				{width: 60, text: '步长', dataIndex: 'increment', sortable: true}],
	tbar: [ {xtype: 'button', text: '添加', action: 'gridAdd', iconCls: 'icon-add'},
			{xtype: 'button', text: '删除', action: 'gridDelete', iconCls: 'icon-delete'},
			{xtype: 'button', text: '修改', action: 'gridEdit', iconCls: 'icon-edit'},
			{xtype: 'button', text: '查询', action: 'gridSearch', iconCls: 'icon-search'} ],
	initComponent:function(){
		var me = this;
		Ext.create('XTFrame.store.Sequence', {storeId: 's_sequence',
			listeners:{
				beforeload: function(store, options){
					var new_params = {
						iFunc: ajaxUtil.FUNC_PAGING,
						strData: Ext.JSON.encode({sqlID: "xtframe_sequences_manage_1", parameters: {name: me.sequencename}, offset: options.start, maxsize: options.limit})
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
			store: Ext.data.StoreManager.lookup('s_sequence'),
			selType: 'checkboxmodel',
			multiSelect: true,
			sequencename: '',
			editWindow: 'XTFrame.view.system.SequenceEditWindow',
			editWinId: 'sequenceEditWindow',
			searchWindow: 'XTFrame.view.system.SequenceSearchWindow',
			searchWinId: 'sequenceSearchWindow',
			addSql: 'xtframe_sequences_manage_3',
			addValues: ['name', 'currval', 'increment'],
			editSql: 'xtframe_sequences_manage_4',
			editValues: ['name', 'currval', 'increment'],
			deleteSql: 'xtframe_sequences_manage_2',
			deleteValues: ['name'],
			searchValues: ['sequencename'],
			dockedItems: [{
				xtype: 'pagingtoolbar',
				dock: 'bottom',
				displayInfo: true,
				store: Ext.data.StoreManager.lookup('s_sequence')
			}]
		});
		this.callParent(arguments);
	}
});