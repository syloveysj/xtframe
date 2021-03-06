Ext.define("XTFrame.view.system.OrganDataManager",{
	extend: 'Ext.grid.Panel',
	region: 'center',
	frame: true,
	autoScroll: true,
	enableKeyNav: true,
	columns: [ Ext.create("Ext.grid.RowNumberer", {width:32}),
				{width: 140, text: '数据名称', dataIndex: 'paramename', sortable: true}, 
				{width: 160, text: '数据值', dataIndex: 'paramevalue',
					renderer: function(value){
						value = value.replace(new RegExp("&","gm"),"&amp;");
						value = value.replace(new RegExp("<","gm"),"&lt;");
						value = value.replace(new RegExp(">","gm"),"&gt;");
						return value;
				}}, 
				{width: 160, text: '备注', dataIndex: 'remark'} ],
	tbar: [ {xtype: 'button', text: '添加', action: 'gridAdd', iconCls: 'icon-add'},
			{xtype: 'button', text: '删除', action: 'gridDelete', iconCls: 'icon-delete'},
			{xtype: 'button', text: '修改', action: 'gridEdit', iconCls: 'icon-edit'},
			{xtype: 'button', text: '查询', action: 'gridSearch', iconCls: 'icon-search'} ],
	initComponent: function(){
		var me = this;
		Ext.create('XTFrame.store.OrganData', {storeId: 's_orgdata',
			listeners:{
				beforeload: function(store, options){
					var new_params = {
						iFunc: ajaxUtil.FUNC_PAGING,
						strData: Ext.JSON.encode({sqlID: "xtframe_orgdata_manage_1", parameters: {paramename: me.paramename, orgid: me.orgid}, offset: options.start, maxsize: options.limit})
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
			store: Ext.data.StoreManager.lookup('s_orgdata'),
			selType: 'checkboxmodel',
			multiSelect: true,
			paramename: '',
			editWindow: 'XTFrame.view.system.OrganDataEditWindow',
			editWinId: 'organdataEditWindow',
			searchWindow: 'XTFrame.view.system.OrganDataSearchWindow',
			searchWinId: 'organdataSearchWindow',
			addSql: 'xtframe_orgdata_manage_3',
			addValues: ['parameid', 'orgid', 'paramename', 'paramevalue', 'remark'],
			editSql: 'xtframe_orgdata_manage_4',
			editValues: ['parameid', 'orgid', 'paramename', 'paramevalue', 'remark'],
			deleteSql: 'xtframe_orgdata_manage_2',
			deleteValues: ['parameid'],
			searchValues: ['paramename'],
			dockedItems: [{
				xtype: 'pagingtoolbar',
				dock: 'bottom',
				displayInfo: true,
				store: Ext.data.StoreManager.lookup('s_orgdata')
			}]
		});
		this.callParent(arguments);
	}
});