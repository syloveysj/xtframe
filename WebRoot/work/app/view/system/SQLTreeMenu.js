Ext.define('XTFrame.view.system.SQLTreeMenu' ,{
    extend: 'Ext.menu.Menu',
    alias: 'widget.systemSQLTreeMenu',
    items: [
    	{text: '添加', action: 'optTree', command: 'add'},
		{text: '编辑', action: 'optTree', command: 'edit'},
		{text: '删除', action: 'optTree', command: 'delete'}
    ]
});