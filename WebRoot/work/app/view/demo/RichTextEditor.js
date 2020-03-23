Ext.define('XTFrame.view.demo.RichTextEditor', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.demoRichTextEditor',
	region: 'center',
//	xtype: 'label',
//	html: '<iframe id="_ifr_richeditor" name="_ifr_richeditor" marginwidth="0" framespacing="0" marginheight="0" frameborder="0" width="100%" height="100%" src="/app/tool/richeditor/editor.jsp"></iframe>'
	tbar: [ {xtype: 'button', text: '获取内容', action: 'getContent', iconCls: 'icon-add'},
			{xtype: 'button', text: '清空内容', action: 'setContent', iconCls: 'icon-add'} ],
	items:[Ext.create('XTFrame.view.Iframe', {src:'/work/app/tool/richeditor/editor.jsp'})]
});