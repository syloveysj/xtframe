Ext.define("XTFrame.view.system.TemplatesManagerTree",{
	extend: 'Ext.tree.Panel',
	alias: 'widget.systemTemplatesManagerTree',
	region: 'west',
	margins: '0 0 0 0',
	title: '模版目录',
	border: false,
	enableDD: false,
	split: true,
	width: 212,
	minSize: 130,
	maxSize: 300,
	rootVisible: false,
	containerScroll: true,
	autoScroll: false,
	collapsible:true,
	collapseDirection:true,
//	headerPosition:'left',
	initComponent: function(){
		Ext.apply(this, {
			tools: [{
				type:'refresh',
				tooltip: '刷新目录'
			}],
			root: {
				id: "0",
				text: "顶级目录",
				expanded: true,
				leaf: false
			}
		});
		this.addEvents({'initcomplete': true});
		this.callParent(arguments);
		this.fireEvent('initcomplete', this);
	}
});