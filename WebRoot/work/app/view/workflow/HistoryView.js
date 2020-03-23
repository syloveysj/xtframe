Ext.define("XTFrame.view.workflow.HistoryView",{
	extend: 'Ext.grid.Panel',
	alias: 'widget.workflowHistoryView',
	frame: true,
	autoScroll: true,
	enableKeyNav: true,
	title: '历史记录',
	collapsible: true,
	height: 200,
	processInstanceId: "",//根据流程实例ID加载数据
	columns: [ Ext.create("Ext.grid.RowNumberer", {width:32}),
				{width: 100, text: '任务名', dataIndex: 'subject'}, 
				{width: 100, text: '执行人', dataIndex: 'userid'}, 
				{width: 80, text: '状态', dataIndex: 'outcome'}, 
				{width: 120, text: '审批意见', dataIndex: 'opinion'}, 
				{width: 120, text: '完成时间', dataIndex: 'currenttime'} ],
	tbar: [ {xtype: 'button', text: '查看详细', action: 'lookInfo', iconCls: 'icon-look'} ],
	initComponent:function(){
		var me = this;
		Ext.create('XTFrame.store.workflow.ProcessRecord', {storeId: 's_processrecord',
			listeners:{
				beforeload: function(store, options){
			        var new_params = {
						iFunc: ajaxUtil.FUNC_EXECUTEQUERY,
						strData: Ext.JSON.encode({sqlID: 'workflow_processrecord',
							arrValue: [me.processInstanceId]
						})
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
			store: Ext.data.StoreManager.lookup('s_processrecord'),
			selType: 'checkboxmodel',
			multiSelect: true
		});
		this.callParent(arguments);
	}
});