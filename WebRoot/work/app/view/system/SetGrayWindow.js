Ext.define('XTFrame.view.system.SetGrayWindow', {
	extend: 'Ext.window.Window',
	requires: [ 'Ext.data.Store',
				'Ext.grid.Panel'],
	alias: 'widget.systemSetGrayWindow',
	title: '设置权限',
	closeAction: 'hide',
	closable: true, 
	iconCls: 'edit-win',
	modal: true, 
	plain: true,
	resizable: false,
	layout: 'fit',
	initComponent:function(){
		var store = Ext.create('Ext.data.Store', {
			fields: ['roleId', 'roleName'],
		    data : []
		});
		this.grid = Ext.create('Ext.grid.Panel', {
			width: 250,
			height: 400,
			selType: 'checkboxmodel',
			multiSelect: true,
			columns: [ Ext.create("Ext.grid.RowNumberer", {width:32}),
					{width: 180, text: '角色名称', dataIndex: 'roleName'}],
			store: store,
			bbar: [ {xtype: 'button', text: '保存', action: 'saveGray', iconCls: 'icon-save'},
					{xtype: 'button', text: '重置', action: 'resetGray', iconCls: 'icon-reset'} ]
		});
		Ext.apply(this,{
			flag: '',
			items: [this.grid]
		});
		this.callParent(arguments);
	}
});