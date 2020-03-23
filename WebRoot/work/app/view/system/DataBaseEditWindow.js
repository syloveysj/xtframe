Ext.define('XTFrame.view.system.DataBaseEditWindow', {
	extend: 'Ext.window.Window',
	requires: [ 'Ext.form.*' ],
	action: 'gridEditWindow',
	title: '数据库编辑',
	closeAction: 'hide',
	closable: false, 
	iconCls: 'edit-win',
	modal: true, 
	plain: true,
	resizable: false,
	items: {
		xtype: 'form',
		width: 520,
		height: 308,
		border: false,
        bodyPadding: 5,
        frame: true,
        layout: 'column',
		fieldDefaults: {
			labelAlign: 'right',
            labelWidth: 76,
            anchor: '98%'
		},
		items: [{
			xtype: 'textfield',
			name:'jndiname',
			fieldLabel: 'JNDIName',
			allowBlank:false,
			blankText:"不能为空，请填写",
			vtype: 'alphanum',
			columnWidth: .7
		},{
			xtype: 'combo',
			name:'dbtype',
			fieldLabel: '数据库类型',
			store: Ext.create('Ext.data.Store', {
				fields: ['text', 'value'],
			    data : [{text: 'mysql', value: '1'},
			    		{text: 'oracle', value: '2'}]
			}),
			queryMode: 'local',
			displayField: 'text',
			valueField: 'value',
			value: '2',
			selectOnFocus:true,
			editable:false,
			columnWidth: .3
		},{
			xtype:'textfield',
			name:'dbname',
			fieldLabel: '数据库名称',
			allowBlank:false,
			blankText:"不能为空，请填写",
			columnWidth: 1.
		},{
			xtype:'textfield',
			name:'driverclassname',
			fieldLabel: '适配器',
			columnWidth: 1.
		},{
			xtype:'textfield',
			name:'url',
			fieldLabel: '连接地址',
			columnWidth: 1.
		},{
			xtype:'textfield',
			name:'username',
			fieldLabel: '用户名',
			columnWidth: 1.
		},{
			xtype:'textfield',
			name:'password',
			fieldLabel: '密码',
			columnWidth: 1.
		},{
			xtype:'textarea',
			name:'remark',
			fieldLabel: '备注',
			columnWidth: 1.
		}],
		buttons: [{
			text:'保　存',
			action: 'gridEditSave',
			formBind: true
		},{
			text:'取　消',
			action: 'gridEditCancel'
		}]
	}
});