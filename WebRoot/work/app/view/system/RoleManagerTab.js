Ext.define('XTFrame.view.system.RoleManagerTab', {
	extend: 'Ext.tab.Panel',
	alias: 'widget.systemRoleManagerTab',
	region: 'center',
	defaults: {
		autoScroll : true,
		padding: '0 0 0 0'
	},
	activeTab: 0,
	border: false,
	autoDestroy: false,
//	deferredRender: false,
	items: [ Ext.create('XTFrame.view.system.RoleManagerUser'),
			Ext.create('XTFrame.view.system.RoleManagerMenu'),
			Ext.create('XTFrame.view.system.RoleManagerSQL'),
			Ext.create('XTFrame.view.system.RoleManagerLogic'),
			Ext.create('XTFrame.view.system.RoleManagerRes') ]
})