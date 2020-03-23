Ext.define("XTFrame.view.workflow.ProcessDefinitionManagerTree",{
	extend: 'Ext.tree.Panel',
	alias: 'widget.workflowProcessDefinitionManagerTree',
	region: 'west',
	title: '流程定义',
	margins: '0 0 0 0',
	enableDD: false,
	split: true,
	width: 460,
	minWidth: 260,
	maxWidth: 600,
	rootVisible: false,
	containerScroll: true,
	collapsible: false,
	autoScroll: false,
	frame: true,
	tbar: [ {xtype: 'button', text: '上传部署', action: 'uploadDeploy', iconCls: 'icon-upload'},
			{xtype: 'button', text: '开启流程', action: 'startProcess', iconCls: 'icon-startprocess'},
			{xtype: 'button', text: '查看定义', action: 'seeDefinition', iconCls: 'icon-see'},
			{xtype: 'button', text: '设置', action: 'setting', iconCls: 'icon-setting'},
			{xtype: 'button', text: '删除', action: 'deployDelete', iconCls: 'icon-delete'},
			{xtype: 'button', text: '刷新', action: 'refresh', iconCls: 'icon-refresh'}],
	fields: ['id', 'name', 'deploymentId', 'version'],
	columns: [ {xtype: 'treecolumn', width: 280, text: '名称', dataIndex: 'id'},
				{text: '部署编号', width: 80, dataIndex: 'deploymentId'},
				{text: '版本号', width: 80, dataIndex: 'version'}],
	initComponent: function(){
		this.addEvents({'uploadsuccess': true});
		this.addEvents({'initcomplete': true});
		this.callParent(arguments);
		this.fireEvent('initcomplete', this);
	}
});