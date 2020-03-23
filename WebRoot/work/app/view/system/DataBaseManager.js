Ext.define("XTFrame.view.system.DataBaseManager",{
	extend: 'Ext.grid.Panel',
	alias: 'widget.systemDataBaseManager',
	region: 'center',
	frame: true,
	autoScroll: true,
	enableKeyNav: true,
	columns: [ Ext.create("Ext.grid.RowNumberer", {width:32}),
				{width: 140, text: 'JNDIName', dataIndex: 'jndiname'}, 
				{width: 160, text: '数据库名称', dataIndex: 'dbname'}, 
				{width: 160, text: '数据库类型', dataIndex: 'dbtype', renderer: function(value) {
					if(value == 1){
						return "mysql";
					} else if(value == 2){
						return "oracle";
					} else {
						return "other";
					}
				}}, 
				{width: 160, text: '登陆用户名', dataIndex: 'username'}, 
				{width: 160, text: '备注', dataIndex: 'remark'} ],
	tbar: [ {xtype: 'button', text: '添加', action: 'gridAdd', iconCls: 'icon-add'},
			{xtype: 'button', text: '删除', action: 'gridDelete', iconCls: 'icon-delete'},
			{xtype: 'button', text: '修改', action: 'gridEdit', iconCls: 'icon-edit'},
			{xtype: 'button', text: '查询', action: 'gridSearch', iconCls: 'icon-search'},
			{xtype: 'button', text: '设置', action: 'setting', iconCls: 'icon-editrole'},
			{xtype: 'button', text: '清理', action: 'clear', iconCls: 'icon-clear'} ],
	initComponent: function(){
		var me = this;
		Ext.create('XTFrame.store.DataBase', {storeId: 's_database',
			listeners:{
				beforeload: function(store, options){
					var new_params = {
						iFunc: ajaxUtil.FUNC_PAGING,
						strData: Ext.JSON.encode({totalSqlObject: {sqlID: "xtframe_database_manage_1", parameters: {jndiname: me.jndiname}},
							querySqlObject: {sqlID: "xtframe_database_manage_2", parameters: {start: options.start, limit: options.limit, jndiname: me.jndiname}}})
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
			store: Ext.data.StoreManager.lookup('s_database'),
			selType: 'checkboxmodel',
			multiSelect: true,
			jndiname: '',
			editWindow: 'XTFrame.view.system.DataBaseEditWindow',
			editWinId: 'databaseEditWindow',
			searchWindow: 'XTFrame.view.system.DataBaseSearchWindow',
			searchWinId: 'databaseSearchWindow',
			addSql: 'xtframe_database_manage_4',
			addValues: ['jndiname', 'dbname', 'dbtype', 'driverclassname', 'url', 'username', 'password', 'remark'],
			editSql: 'xtframe_database_manage_5',
			editValues: ['jndiname', 'dbname', 'dbtype', 'driverclassname', 'url', 'username', 'password', 'remark'],
			deleteSql: 'xtframe_database_manage_3',
			deleteValues: ['jndiname'],
			searchValues: ['jndiname'],
			dockedItems: [{
				xtype: 'pagingtoolbar',
				dock: 'bottom',
				displayInfo: true,
				store: Ext.data.StoreManager.lookup('s_database')
			}]
		});
		this.callParent(arguments);
	}
});