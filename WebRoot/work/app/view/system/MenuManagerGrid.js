Ext.define("XTFrame.view.system.MenuManagerGrid",{
	extend: 'Ext.grid.Panel',
	alias: 'widget.systemMenuManagerGrid',
	region: 'center',
	frame: true,
	autoScroll: true,
	enableKeyNav: true,
	columns: [ Ext.create("Ext.grid.RowNumberer", {width:32}),
				{width: 140, text: '菜单编号', dataIndex: 'menuid', sortable: true}, 
				{width: 160, text: '菜单名称', dataIndex: 'menuname'}, 
				{width: 120, text: 'url', dataIndex: 'url'}, 
				{width: 120, text: '顺序', dataIndex: 'sortno'}, 
				{width: 160, text: '备注', dataIndex: 'remark'} ],
	tbar: [ {xtype: 'button', text: '添加', action: 'gridAdd', iconCls: 'icon-add'},
			{xtype: 'button', text: '删除', action: 'gridDelete', iconCls: 'icon-delete'},
			{xtype: 'button', text: '修改', action: 'gridEdit', iconCls: 'icon-edit'} ],
	initComponent:function(){
		var me = this;
		Ext.create('XTFrame.store.Menu', {storeId: 's_menu',
			listeners:{
				beforeload: function(store, options){
					var new_params = {
						iFunc: ajaxUtil.FUNC_PAGING,
						strData: Ext.JSON.encode({sqlID: "xtframe_menu_manage_2", parameters: {menuidpath: me.menuidpath}, offset: options.start, maxsize: options.limit})
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
			store: Ext.data.StoreManager.lookup('s_menu'),
			selType: 'checkboxmodel',
			multiSelect: true,
			menuid: '0',
			menuidpath: '',
			editWindow: 'XTFrame.view.system.MenuEditWindow',
			editWinId: 'menuEditWindow',
			addSql: 'xtframe_menu_manage_3',
			addValues: ['menuid', 'menupid', 'menuname', 'menuicon', 'menutype', 'menuidpath', 'menulevel', 'sortno', 'remark', 'url', 'swfurl'],
			editSql: 'xtframe_menu_manage_4',
			editValues: ['menuid', 'menuname', 'menuicon', 'menutype', 'sortno', 'remark', 'url', 'swfurl'],
			deleteSql: 'xtframe_menu_manage_5',
			deleteValues: ['menuidpath'],
			dockedItems: [{
				xtype: 'pagingtoolbar',
				dock: 'bottom',
				displayInfo: true,
				store: Ext.data.StoreManager.lookup('s_menu')
			}]
		});
		this.addEvents({'beforeupdate': true});
		this.addEvents({'update': true});
		this.callParent(arguments);
	}
});