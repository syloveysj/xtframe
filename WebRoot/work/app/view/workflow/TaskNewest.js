Ext.define("XTFrame.view.workflow.TaskNewest",{
	extend: 'Ext.grid.Panel',
	alias: 'widget.workflowTaskNewest',
	region: 'west',
	title: '待完成任务',
	width: 412,
	frame: true,
	autoScroll: true,
	enableKeyNav: true,
	columns: [ Ext.create("Ext.grid.RowNumberer", {width:32}),
				{width: 140, text: '任务名称', dataIndex: 'name'}, 
				{width: 160, text: '到达时间', dataIndex: 'createTime'}],
	tbar: [ {xtype: 'button', text: '流程图', action: 'gridProcessView', iconCls: 'icon-see',
				viewType: 'task', viewKey: 'id'},
			{xtype: 'button', text: '查看', action: 'lookTask', iconCls: 'icon-look'},
			{xtype: 'button', text: '刷新', action: 'refresh', iconCls: 'icon-refresh'}],
	initComponent:function(){
		var me = this;
		Ext.create('XTFrame.store.workflow.Task', {storeId: 's_task',
			listeners:{
				beforeload: function(store, options){
			        var new_params = {
						iFunc: ajaxUtil.FUNC_TASK_LIST
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
			store: Ext.data.StoreManager.lookup('s_task'),
			selType: 'checkboxmodel',
			multiSelect: true
		});
		this.addEvents({'tasksubmit': true});
		this.callParent(arguments);
	}
});