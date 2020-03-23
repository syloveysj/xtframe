Ext.define("XTFrame.view.workflow.ProcessDefinitionManagerGrid",{
	extend: 'Ext.grid.Panel',
	alias: 'widget.workflowProcessDefinitionManagerGrid',
	region: 'center',
	title: '流程实例',
	frame: true,
	autoScroll: true,
	enableKeyNav: true,
	columns: [ Ext.create("Ext.grid.RowNumberer", {width:32}),
				{width: 100, text: '流程实例编号', dataIndex: 'id'}, 
				{width: 120, text: '活动名称', dataIndex: 'activeActivityNames'}, 
				{width: 80, text: '状态', dataIndex: 'state'} ],
	tbar: [ {xtype: 'button', text: '流程图', action: 'gridProcessView', iconCls: 'icon-see',
				viewType: 'instance', viewKey: 'id'} ],
	initComponent:function(){
		var me = this;
		Ext.create('XTFrame.store.workflow.ProcessInstance', {storeId: 's_processinstance',
			listeners:{
				beforeload: function(store, options){
			        var new_params = {
						iFunc: ajaxUtil.FUNC_PROCESSINSTANCE_LIST
					};
					if(me.pdid) new_params.strData = Ext.JSON.encode({id: me.pdid});
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
			store: Ext.data.StoreManager.lookup('s_processinstance'),
			selType: 'checkboxmodel',
			multiSelect: true
		});
		this.callParent(arguments);
	}
});