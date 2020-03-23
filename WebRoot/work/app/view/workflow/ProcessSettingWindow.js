Ext.define('XTFrame.view.workflow.ProcessSettingWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.workflowProcessSettingWindow',
	requires: [ 'Ext.form.*' ],
	title: '流程设置',
	closeAction: 'hide',
	closable: true, 
	iconCls: 'edit-win',
	modal: true, 
	plain: true,
	resizable: false,
	width: 620,
	height: 500,
	autoScroll: true,
	layout: 'fit',
	processRecord: null,//进行设置行的流程定义对象
	items: [ Ext.create('XTFrame.view.workflow.ProcessSettingTab') ],
	initComponent:function(){
		this.callParent(arguments);
	}
});