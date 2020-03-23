Ext.define("XTFrame.view.workflow.ProcessSettingForm",{
	extend: 'Ext.grid.Panel',
	alias: 'widget.workflowProcessSettingForm',
	title: '表单页面',
	frame: true,
	autoScroll: true,
	enableKeyNav: true,
	columns: [ Ext.create("Ext.grid.RowNumberer", {width:32}),
				{width: 140, text: '表单名称', dataIndex: 'formvalue'}, 
				{width: 240, text: '备注', dataIndex: 'remark'}, 
				{width: 150, text: '创建时间', dataIndex: 'currenttime'} ],
	processRecord: null,
	initComponent: function(){
		var me = this;
		Ext.create('XTFrame.store.workflow.Page', {storeId: 's_page',
			listeners:{
				beforeload: function(store, options){
			        var new_params = {
						iFunc: ajaxUtil.FUNC_PAGING,
						strData: Ext.JSON.encode({totalSqlValue: ["workflow_page_1", me.processDefinitionId, me.formValue.getValue()],
							querySqlValue: ["workflow_page_2", options.start, options.limit, me.processDefinitionId, me.formValue.getValue()]})
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
		this.formValue = Ext.create('Ext.form.field.Text',{fieldLabel: '表单名称',labelWidth: 60});
		Ext.apply(this,{
			tbar: [ {xtype: 'button', text: '添加', action: 'gridAdd', iconCls: 'icon-add'},
				{xtype: 'button', text: '删除', action: 'gridDelete', iconCls: 'icon-delete'},
				{xtype: 'button', text: '修改', action: 'gridEdit', iconCls: 'icon-edit'},
				{xtype: 'tbfill'},
				this.formValue,
				{xtype: 'button', text: '查询', action: 'pageSearch', iconCls: 'icon-search'} ],
			store: Ext.data.StoreManager.lookup('s_page'),
			selType: 'checkboxmodel',
			multiSelect: true,
			processDefinitionId: '',
			editWindow: 'XTFrame.view.workflow.ProcessSettingFormEditWindow',
			editWinId: 'processSettingFormEditWindow',
			addSql: 'workflow_page_4',
			addValues: ['pageid', 'formvalue', 'processdefinitionid', 'parameters', 'remark'],
			editSql: 'workflow_page_5',
			editValues: ['pageid', 'formvalue', 'processdefinitionid', 'parameters', 'remark'],
			deleteSql: 'workflow_page_3',
			deleteValues: ['pageid'],
			dockedItems: [{
				xtype: 'pagingtoolbar',
				dock: 'bottom',
				displayInfo: true,
				store: Ext.data.StoreManager.lookup('s_page')
			}],
			setSetting: function(processRecord){
				if(this.processRecord!=null && this.processRecord.id==processRecord.id) return;
				this.processRecord = processRecord;
				this.processDefinitionId = processRecord.id;
				this.getStore().load();
			}
		});
		this.addEvents({'beforeupdate': true});
		this.callParent(arguments);
	}
});