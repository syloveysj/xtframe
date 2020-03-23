Ext.define('XTFrame.view.workflow.BaseFormWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.workflowBaseFormWindow',
	requires: [ 'Ext.form.*' ],
	title: '任务窗口',
//	closeAction: 'hide',
	closable: true, 
	iconCls: 'edit-win',
	modal: true, 
	plain: true,
	resizable: false,
//	maximizable: true,
	width: 620,
	autoScroll: true,
	layout: 'fit',
	initComponent:function(){
//		this.extendForm = Ext.create('XTFrame.view.workflow.leave.ApplyForm');
//		this.baseForm = Ext.create('XTFrame.view.workflow.BaseForm');
//		this.historyView = Ext.create('XTFrame.view.workflow.HistoryView');
//		Ext.apply(this,{
//			items:[
//				this.extendForm,
//				this.baseForm,
//				this.historyView
//			]
//		});
		this.callParent(arguments);
	}
});