Ext.define("XTFrame.view.system.SQLModuleTree",{
	extend: 'Ext.tree.Panel',
	alias: 'widget.systemSQLModuleTree',
	region: 'west',
	margins: '0 0 0 0',
	title: 'SQL模块',
	border: false,
	enableDD: false,
	split: true,
	width: 212,
	minSize: 130,
	maxSize: 300,
	rootVisible: true,
	containerScroll: true,
	collapsible: false,
	autoScroll: false,
	initComponent: function(){
		Ext.apply(this, {
			tools: [{
				type:'refresh',
				tooltip: '刷新模块'
			}],
			root: {
				id: "0",
				text: "平台SQL",
				expanded: true,
				leaf: false,
				menuid:"0",
				menuidpath: ""
			}
		});
		this.addEvents({'initcomplete': true});
		this.callParent(arguments);
		this.fireEvent('initcomplete', this);
	}
});