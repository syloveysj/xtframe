Ext.define('XTFrame.view.system.SequenceEditWindow', {
	extend: 'Ext.window.Window',
	requires: [ 'Ext.form.*' ],
	action: 'gridEditWindow',
	title: '逻辑编辑',
	closeAction: 'hide',
	closable: false, 
	iconCls: 'edit-win',
	modal: true, 
	plain: true,
	resizable: false,
	items: {
		xtype: 'form',
		width: 400,
		height: 108,
		border: false,
        bodyPadding: 5,
        frame: true,
        layout: 'column',
		fieldDefaults: {
			labelAlign: 'right',
            labelWidth: 60,
            anchor: '98%'
		},
		items: [{
			xtype: 'textfield',
			name:'name',
			fieldLabel: '名称',
			allowBlank: false,
			blankText: "不能为空，请填写",
			columnWidth: 1.
		},{
			xtype:'textfield',
			name:'currval',
			fieldLabel: '当前值',
			allowBlank: false,
			blankText: "不能为空，请填写",
			vtype: 'integer',
			vtype: 'min',
			min: 0,
			columnWidth: .5
		},{
			xtype:'textfield',
			name:'increment',
			fieldLabel: '步长',
			allowBlank: false,
			blankText: "不能为空，请填写",
			vtype: 'integer',
			vtype: 'min',
			min: 1,
			columnWidth: .5
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