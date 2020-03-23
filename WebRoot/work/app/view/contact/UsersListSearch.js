Ext.define("XTFrame.view.contact.UsersListSearch",{
	extend: 'Ext.tree.Panel',
	alias: 'widget.contactUsersListSearch',
	region: 'west',
	margins: '0 0 0 0',
	title: '岗位',
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
				id: "root",
				text: "所有岗位",
				expanded: true,
				leaf: false,
				atjobid: ""
			}
		});
		this.addEvents({'initcomplete': true});
		this.callParent(arguments);
		this.fireEvent('initcomplete', this);
	}
});