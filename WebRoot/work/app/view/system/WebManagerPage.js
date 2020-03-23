Ext.define("XTFrame.view.system.WebManagerPage",{
	extend: 'Ext.tree.Panel',
	alias: 'widget.systemWebManagerPage',
	region: 'west',
	margins: '0 0 0 0',
	title: 'Web结构',
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
				tooltip: '刷新'
			}],
			root: {
				id: "0",
				text: "Web平台",
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