Ext.define('XTFrame.view.workflow.ProcessSettingTab', {
	extend: 'Ext.tab.Panel',
	alias: 'widget.workflowProcessSettingTab',
	region: 'center',
	defaults: {
		autoScroll : true,
		padding: '0 0 0 0'
	},
	activeTab: 0,
	border: false,
	autoDestroy: false,
	items: [ Ext.create('XTFrame.view.workflow.ProcessSettingBase'),
			Ext.create('XTFrame.view.workflow.ProcessSettingForm')]
});