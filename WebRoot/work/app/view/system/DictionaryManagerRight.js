Ext.define("XTFrame.view.system.DictionaryManagerRight",{
	extend: 'Ext.grid.Panel',
	alias: 'widget.systemDictionaryManagerRight',
	region: 'center',
	frame: true,
	autoScroll: true,
	enableKeyNav: true,
	columns: [ Ext.create("Ext.grid.RowNumberer", {width:32}),
				{width: 140, text: '字典编码', dataIndex: 'dicid'}, 
				{width: 160, text: '名称', dataIndex: 'dicname'}, 
				{width: 180, text: '内容', dataIndex: 'dicvalue'} ],
	initComponent: function(){
		var me = this;
		Ext.create('XTFrame.store.Dictionary', {storeId: 's_dictionary_right',
			autoLoad: false,
			listeners:{
				beforeload: function(store, options){
					var new_params = {
						iFunc: ajaxUtil.FUNC_PAGING,
						strData: Ext.JSON.encode({sqlID: "xtframe_dictionary_manage_2", parameters: {dicpid: me.dicpid}, offset: options.start, maxsize: options.limit})
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
		this.dictionaryText = Ext.create('Ext.toolbar.TextItem');
		Ext.apply(this,{
			tbar: [ {xtype: 'button', text: '添加', action: 'gridAdd', iconCls: 'icon-add'},
					{xtype: 'button', text: '删除', action: 'gridDelete', iconCls: 'icon-delete'},
					{xtype: 'button', text: '修改', action: 'gridEdit', iconCls: 'icon-edit'},
					{xtype: 'tbtext', text:"&nbsp;&nbsp;&nbsp;<font color='red'>当前字典:</font>"},
					this.dictionaryText],
			store: Ext.data.StoreManager.lookup('s_dictionary_right'),
			selType: 'checkboxmodel',
			multiSelect: true,
			dicpid: '',
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
				store: Ext.data.StoreManager.lookup('s_dictionary_right')
			}]
		});
		this.addEvents({'beforeupdate': true});
		this.callParent(arguments);
	}
});