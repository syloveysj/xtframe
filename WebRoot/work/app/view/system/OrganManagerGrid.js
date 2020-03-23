Ext.define("XTFrame.view.system.OrganManagerGrid",{
	extend: 'Ext.grid.Panel',
	alias: 'widget.systemOrganManagerGrid',
	region: 'center',
	frame: true,
	autoScroll: true,
	enableKeyNav: true,
	columns: [ Ext.create("Ext.grid.RowNumberer", {width:32}),
				{width: 140, text: '机构编号', dataIndex: 'orgid', sortable: true}, 
				{width: 160, text: '机构名称', dataIndex: 'orgname'}, 
				{width: 120, text: '顺序', dataIndex: 'sortno'}, 
				{width: 160, text: '备注', dataIndex: 'remark'} ],
	tbar: [ {xtype: 'button', text: '添加', action: 'gridAdd', iconCls: 'icon-add'},
			{xtype: 'button', text: '删除', action: 'gridDelete', iconCls: 'icon-delete'},
			{xtype: 'button', text: '修改', action: 'gridEdit', iconCls: 'icon-edit'} ],
	initComponent:function(){
		var me = this;
		Ext.create('XTFrame.store.Organ', {storeId: 's_org',
			listeners:{
				beforeload: function(store, options){
					var new_params = {
						iFunc: ajaxUtil.FUNC_PAGING,
						strData: Ext.JSON.encode({sqlID: "xtframe_org_manage_2", parameters: {orgidpath: me.orgidpath, auto_orgidpath:""}, offset: options.start, maxsize: options.limit})
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
			store: Ext.data.StoreManager.lookup('s_org'),
			selType: 'checkboxmodel',
			multiSelect: true,
			orgidpath: '',
			orgid: '',
			editWindow: 'XTFrame.view.system.OrganEditWindow',
			editWinId: 'orgEditWindow',
			addSql: 'xtframe_org_manage_4',
			addValues: ['orgid', 'orgname', 'orgidpath', 'orgpid', 'orglevel', 'sortno', 'remark'],
			editSql: 'xtframe_org_manage_5',
			editValues: ['orgid', 'orgname', 'sortno', 'remark', 'orgidpath'],
			deleteSql: 'xtframe_org_manage_3',
			deleteValues: ['orgidpath', 'auto_orgidpath'],
			dockedItems: [{
				xtype: 'pagingtoolbar',
				dock: 'bottom',
				displayInfo: true,
				store: Ext.data.StoreManager.lookup('s_org')
			}]
		});
		this.addEvents({'beforeupdate': true});
		this.addEvents({'update': true});
		this.callParent(arguments);
	}
});