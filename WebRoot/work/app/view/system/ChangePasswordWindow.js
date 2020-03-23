Ext.define('XTFrame.view.system.ChangePasswordWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.systemChangePasswordWindow',
	requires: [ 'Ext.form.*' ],
	height: 160,
	width: 286,
	title: '修改密码',
	closeAction: 'hide',
	closable: true, 
	iconCls: 'icon-changepwd',
	layout: 'fit',
	modal: true, 
	plain: true,
	resizable: false,
	action: 'gridEditWindow',
	items: {
		xtype: 'form',
		border: false,
        bodyPadding: 10,
		fieldDefaults: {
			labelAlign: 'right',
			labelWidth: 72,
			labelStyle: 'font-weight:bold'
		},
		defaults: {
			margins: '0 0 10 0'
		},
		items: [{
			xtype: 'textfield',
            fieldLabel: '密&nbsp;&nbsp;&nbsp;码',
            allowBlank: false,
			blankText : '密码不能为空',
			name:'pwd',
			width:240,
			inputType : 'password' 
		},{
			xtype: 'textfield',
            fieldLabel: '新密码',
            allowBlank: false,
			blankText : '新密码不能为空',
			id:'changePassword',
			name:'newpwd',
			width:240,
			inputType : 'password' 
		},{
			xtype: 'textfield',
            fieldLabel: '重复新密码',
           	allowBlank: false,
			blankText : '重复新密码不能为空',
			name:'rpwd',
			vtype: 'passwd',
			initialPassField: 'changePassword',
			width:240,
			inputType : 'password' 
		}],
		buttons: [{
			text:'保　存',
			action: 'savePwd',
			formBind: true
		},{
			text:'重　置',
			action: 'resetForm'
		}]
	}
});