Ext.define("XTFrame.view.system.JobManagerTree",{
	extend: 'Ext.tree.Panel',
	alias: 'widget.systemJobManagerTree',
	region: 'west',
	margins: '0 0 0 0',
	title: '岗位结构',
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
				tooltip: '刷新岗位'
			}],
			root: {
				id: "0",
				text: "顶级岗位",
				expanded: true,
				leaf: false,
				jobid: "0",
				jobidpath: ""
			}
		});
		this.addEvents({'initcomplete': true});
		this.callParent(arguments);
		this.fireEvent('initcomplete', this);
	}
});