Ext.define('XTFrame.view.Login', {
	extend: 'Ext.window.Window',
	alias: 'widget.loginForm',
	requires: [ 'Ext.form.*',
				'XTFrame.view.CheckCode'],
	height: 160,
	width: 280,
	title: '用户登陆',
	closeAction: 'hide',
	closable: false, 
	iconCls: 'win',
	layout: 'fit',
	modal: true, 
	plain: true,
	resizable: false,
	items: {
		xtype: 'form',
		border: false,
        bodyPadding: 10,
		fieldDefaults: {
			labelAlign: 'left',
			labelWidth: 55,
			labelStyle: 'font-weight:bold'
		},
		defaults: {
			margins: '0 0 10 0'
		},
		items: [{
			xtype: 'textfield',
            fieldLabel: '用户名',
			blankText : '用户名不能为空',
			name:'userName',
			id:'userName',
            allowBlank: false,
			width:240
		},{
			xtype: 'textfield',
            fieldLabel: '密&nbsp;&nbsp;&nbsp;码',
            allowBlank: false,
			blankText : '密码不能为空',
			name:'passWord',
			id:'passWord',
			width:240,
			inputType : 'password' 
		},{
			xtype: 'checkcode',
			cls : 'key',
			fieldLabel : '验证码',
			name : 'checkCode',
			id : 'checkCode',
			allowBlank : false,
			isLoader:true,
			blankText : '验证码不能为空',
			codeUrl: '/server/rand.do',
			width : 160
		}],
		buttons: [{
			text:'登录',
			action: 'login',
			formBind: true
		}]
	}
});