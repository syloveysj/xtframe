Ext.define("XTFrame.view.system.OrganManagerTree",{
	extend: 'Ext.tree.Panel',
	alias: 'widget.systemOrganManagerTree',
	region: 'west',
	margins: '0 0 0 0',
	title: '组织机构',
	border: false,
	enableDD: false,
	split: true,
	width: 212,
	minSize: 130,
	maxSize: 300,
	rootVisible: false,
	containerScroll: true,
	collapsible: false,
	autoScroll: false,
	initComponent: function(){
		Ext.apply(this, {
			tools: [{
				type:'refresh',
				tooltip: '刷新机构'
			}]
		});
		this.addEvents({'initcomplete': true});
		this.callParent(arguments);
		this.fireEvent('initcomplete', this);
	}
});