Ext.define("XTFrame.view.system.ResManager",{
	extend: 'Ext.grid.Panel',
	region: 'center',
	frame: true,
	autoScroll: true,
	enableKeyNav: true,
	columns: [ Ext.create("Ext.grid.RowNumberer", {width:32}),
				{width: 160, text: '资源名称', dataIndex: 'resname'}, 
				{width: 260, text: '资源定位', dataIndex: 'uri'}, 
				{width: 60, text: '序号', dataIndex: 'sortno', sortable: true}, 
				{width: 160, text: '备注', dataIndex: 'remark'} ],
	tbar: [ {xtype: 'button', text: '添加', action: 'gridAdd', iconCls: 'icon-add'},
			{xtype: 'button', text: '删除', action: 'gridDelete', iconCls: 'icon-delete'},
			{xtype: 'button', text: '修改', action: 'gridEdit', iconCls: 'icon-edit'},
			{xtype: 'button', text: '查询', action: 'gridSearch', iconCls: 'icon-search'} ],
	initComponent:function(){
		var me = this;
		Ext.create('XTFrame.store.Res', {storeId: 's_res',
			listeners:{
				beforeload: function(store, options){
					var new_params = {
						iFunc: ajaxUtil.FUNC_PAGING,
						strData: Ext.JSON.encode({sqlID: "xtframe_res_manage_1", parameters: {resname: me.resname}, offset: options.start, maxsize: options.limit})
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
			store: Ext.data.StoreManager.lookup('s_res'),
			selType: 'checkboxmodel',
			multiSelect: true,
			resname: '',
			editWindow: 'XTFrame.view.system.ResEditWindow',
			editWinId: 'resEditWindow',
			searchWindow: 'XTFrame.view.system.ResSearchWindow',
			searchWinId: 'resSearchWindow',
			addSql: 'xtframe_res_manage_3',
			addValues: ['resid', 'resname', 'uri', 'sortno', 'remark'],
			editSql: 'xtframe_res_manage_4',
			editValues: ['resid', 'resname', 'uri', 'sortno', 'remark'],
			deleteSql: 'xtframe_res_manage_2',
			deleteValues: ['resid'],
			searchValues: ['resname'],
			dockedItems: [{
				xtype: 'pagingtoolbar',
				dock: 'bottom',
				displayInfo: true,
				store: Ext.data.StoreManager.lookup('s_res')
			}]
		});
		this.callParent(arguments);
	}
});