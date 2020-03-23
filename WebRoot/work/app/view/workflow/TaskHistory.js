Ext.define("XTFrame.view.workflow.TaskHistory",{
	extend: 'Ext.grid.Panel',
	alias: 'widget.workflowTaskHistory',
	region: 'center',
	title: '已完成任务',
	frame: true,
	autoScroll: true,
	enableKeyNav: true,
	columns: [ Ext.create("Ext.grid.RowNumberer", {width:32}),
				{width: 140, text: '任务名', dataIndex: 'subject'}, 
				{width: 100, text: '决定', dataIndex: 'outcome'}, 
				{width: 160, text: '完成时间', dataIndex: 'currenttime'}],
	tbar: [ {xtype: 'button', text: '流程图', action: 'gridProcessView', iconCls: 'icon-see',
				viewType: 'task', viewKey: 'taskid'},
			{xtype: 'button', text: '查看', action: 'lookTask', iconCls: 'icon-look'}],
	initComponent:function(){
		var me = this;
		Ext.create('XTFrame.store.workflow.ProcessRecord', {storeId: 's_taskhistory',
			autoLoad: true,
			proxy:{
			    type:'ajax',
			    url:'/server/ajax.do',
			    reader: {
			        type: 'json',
			        root: 'query',
			        totalProperty : 'total'
			    },writer:{
					type:'json'
				}
			},
			listeners:{
				beforeload: function(store, options){
			        var new_params = {
						iFunc: ajaxUtil.FUNC_PAGING,
						strData: Ext.JSON.encode({totalSqlValue: ["workflow_processrecord_1", '', me.subject],
							querySqlValue: ["workflow_processrecord_2", options.start, options.limit, '', me.subject]})
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
			store: Ext.data.StoreManager.lookup('s_taskhistory'),
			selType: 'checkboxmodel',
			multiSelect: true,
			subject: '',
			dockedItems: [{
				xtype: 'pagingtoolbar',
				dock: 'bottom',
				displayInfo: true,
				store: Ext.data.StoreManager.lookup('s_taskhistory')
			}]
		});
		this.callParent(arguments);
	}
});