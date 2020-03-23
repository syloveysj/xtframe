Ext.define('XTFrame.view.system.TemplatesManager', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.systemTemplatesManager',
	region: 'center',
	tbar: [ {xtype: 'button', text: '获取内容', action: 'getContent', iconCls: 'icon-add'},
			{xtype: 'button', text: '清空内容', action: 'setContent', iconCls: 'icon-add'} ],
	items:[Ext.create('XTFrame.view.Iframe', {src:'/work/app/tool/codemirror/codemirror.jsp'})]
});