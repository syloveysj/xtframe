Ext.define('XTFrame.view.TabPanel', {
	extend: 'Ext.tab.Panel',
	alias: 'widget.contentPanel',
	region: 'center',
	defaults: {
		autoScroll : true,
		padding: '0 0 0 0'
	},
	activeTab: 0,
	border: false,
	autoDestroy: false,
//	plain: true, 
	items: [ {
		id: 'HomePage',
		title: '首页',
		iconCls: 'home',
		layout: 'fit'
	} ]
})