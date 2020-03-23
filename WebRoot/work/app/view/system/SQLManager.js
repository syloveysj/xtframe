Ext.define("XTFrame.view.system.SQLManager",{
	extend: 'Ext.grid.Panel',
	alias: 'widget.systemSQLManager',
	region: 'center',
	frame: true,
	autoScroll: true,
	enableKeyNav: true,//按键操作
	columns: [ Ext.create("Ext.grid.RowNumberer", {width:32}),
				{width: 80, text: '数据库', dataIndex: 'dbtype', sortable: true},  
				{width: 220, text: 'SQL编号', dataIndex: 'sqlid', sortable: true},//用于锁定列：, locked: true}, 
				{width: 160, text: 'SQL名称', dataIndex: 'sqlname'}, 
				{width: 120, text: '模型', dataIndex: 'sqltemplet'}, 
				{width: 120, text: '验证规则', dataIndex: 'dataverify'}, 
				{width: 60, text: '序号', dataIndex: 'sortno', sortable: true}, 
				{width: 140, text: '备注', dataIndex: 'remark'} ],
	initComponent:function(){
		var me = this;
		Ext.create('XTFrame.store.SQL', {storeId: 's_sql',
			listeners:{
				beforeload: function(store, options){
					var new_params = {
						iFunc: ajaxUtil.FUNC_PAGING,
						strData: Ext.JSON.encode({sqlID: "xtframe_sql_manage_1", parameters: {sqlid: me.sqlid, dbtype: me.dbtype, modid: me.modid}, offset: options.start, maxsize: options.limit})
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
		
		this.moduleText = Ext.create('Ext.toolbar.TextItem');
		Ext.apply(this,{
			tbar: [ {xtype: 'button', text: '添加', action: 'gridAdd', iconCls: 'icon-add'},
					{xtype: 'button', text: '删除', action: 'gridDelete', iconCls: 'icon-delete'},
					{xtype: 'button', text: '修改', action: 'gridEdit', iconCls: 'icon-edit'},
					{xtype: 'button', text: '查询', action: 'gridSearch', iconCls: 'icon-search'},
					{xtype: 'tbtext', text:"&nbsp;&nbsp;&nbsp;<font color='red'>当前模块:</font>"},
					this.moduleText ],
			store: Ext.data.StoreManager.lookup('s_sql'),
			selType: 'checkboxmodel',
			multiSelect: true,
			sqlid: '',
			dbtype: '',
			modid: 0,
			editWindow: 'XTFrame.view.system.SQLEditWindow',
			editWinId: 'sqlEditWindow',
			searchWindow: 'XTFrame.view.system.SQLSearchWindow',
			searchWinId: 'sqlSearchWindow',
			addSql: 'xtframe_sql_manage_2',
			addValues: ['sqlid', 'syscode', 'exectype', 'dbtype', 'sqlname', 'sqltemplet', 'dataverify', 'sortno', 'remark', 'modid'],
			editSql: 'xtframe_sql_manage_3',
			editValues: ['sqlid', 'syscode', 'exectype', 'dbtype', 'sqlname', 'sqltemplet', 'dataverify', 'sortno', 'remark', 'modid'],
			deleteSql: 'xtframe_sql_manage_4',
			deleteValues: ['sqlid', 'dbtype'],
			searchValues: ['sqlid', 'dbtype'],
			dockedItems: [{
				xtype: 'pagingtoolbar',
				dock: 'bottom',
				displayInfo: true,
				store: Ext.data.StoreManager.lookup('s_sql')
			}],
			listeners: {	//解决滚动条卡住问题
				scrollershow: function(scroller) {
					if (scroller && scroller.scrollEl) {
						scroller.clearManagedListeners();
						scroller.mon(scroller.scrollEl, 'scroll', scroller.onElScroll, scroller);
					}
				}
			}
		});
		this.callParent(arguments);
	}
});