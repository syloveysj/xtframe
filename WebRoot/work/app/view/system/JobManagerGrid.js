Ext.define("XTFrame.view.system.JobManagerGrid",{
	extend: 'Ext.grid.Panel',
	alias: 'widget.systemJobManagerGrid',
	region: 'center',
	frame: true,
	autoScroll: true,
	enableKeyNav: true,
	columns: [ Ext.create("Ext.grid.RowNumberer", {width:32}),
				{width: 140, text: '岗位编号', dataIndex: 'jobid', sortable: true}, 
				{width: 160, text: '岗位名称', dataIndex: 'jobname'}, 
				{width: 120, text: '顺序', dataIndex: 'sortno'}, 
				{width: 160, text: '备注', dataIndex: 'remark'} ],
	tbar: [ {xtype: 'button', text: '添加', action: 'gridAdd', iconCls: 'icon-add'},
			{xtype: 'button', text: '删除', action: 'gridDelete', iconCls: 'icon-delete'},
			{xtype: 'button', text: '修改', action: 'gridEdit', iconCls: 'icon-edit'},
			{xtype: 'button', text: '授权', action: 'userGray', iconCls: 'icon-usergray'},
			{xtype: 'button', text: '授权权', action: 'userGrayGray', iconCls: 'icon-usergraygray'} ],
	initComponent:function(){
		var me = this;
		Ext.create('XTFrame.store.Job', {storeId: 's_job',
			listeners:{
				beforeload: function(store, options){
					var new_params = {
						iFunc: ajaxUtil.FUNC_PAGING,
						strData: Ext.JSON.encode({sqlID: "xtframe_job_manage_2", parameters: {jobidpath: me.jobidpath, orgid:""}, offset: options.start, maxsize: options.limit})
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
			store: Ext.data.StoreManager.lookup('s_job'),
			selType: 'checkboxmodel',
			multiSelect: true,
			jobidpath: '',
			jobpid: '',
			editWindow: 'XTFrame.view.system.JobEditWindow',
			editWinId: 'jobEditWindow',
			addSql: 'xtframe_job_manage_4',
			addValues: ['jobid', 'jobname', 'jobidpath', 'jobpid', 'joblevel', 'sortno', 'remark', 'auto_orgidpath'],
			editSql: 'xtframe_job_manage_5',
			editValues: ['jobid', 'jobname', 'sortno', 'remark', 'auto_orgidpath'],
			deleteSql: 'xtframe_job_manage_3',
			deleteValues: ['jobidpath', 'auto_orgidpath'],
			dockedItems: [{
				xtype: 'pagingtoolbar',
				dock: 'bottom',
				displayInfo: true,
				store: Ext.data.StoreManager.lookup('s_job')
			}]
		});
		this.addEvents({'beforeupdate': true});
		this.addEvents({'update': true});
		this.callParent(arguments);
	}
});