Ext.define('XTFrame.view.contact.UsersListWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.contactUsersListWindow',
	title: '选择用户',
	closeAction: 'hide',
	closable: true, 
	iconCls: 'edit-users',
	modal: true, 
	plain: true,
	resizable: false,
	layout: 'border',
	width: 580,
	height: 400,
	initComponent:function(){
		Ext.apply(this,{
			items: [
				Ext.create('XTFrame.view.contact.UsersListSearch'),
				Ext.create('XTFrame.view.contact.UsersListGrid'),
				Ext.create('XTFrame.view.contact.UserContactPanel')
			]
		});
		this.callParent(arguments);
	}
});