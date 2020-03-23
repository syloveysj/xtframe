Ext.define('XTFrame.view.system.ResEditWindow', {
	extend: 'Ext.window.Window',
	requires: [ 'Ext.form.*' ],
	action: 'gridEditWindow',
	title: '资源编辑',
	closeAction: 'hide',
	closable: false, 
	iconCls: 'edit-win',
	modal: true, 
	plain: true,
	resizable: false,
	items: {
		xtype: 'form',
		width: 400,
		height: 194,
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
			xtype:'textfield',
			name:'resname',
			fieldLabel: '资源名称',
			allowBlank:false,
			blankText:"不能为空，请填写",
			columnWidth: .7
		},{
			xtype:'textfield',
			name:'sortno',
			fieldLabel: '序号',
			allowBlank:false,
			blankText:"不能为空，请填写",
			vtype: 'integer',
			columnWidth: .3
		},{
			xtype:'textfield',
			name:'uri',
			fieldLabel: '资源定位',
			columnWidth: 1.
		},{
			xtype:'textarea',
			name:'remark',
			fieldLabel: '备注',
			columnWidth: 1.
		},{
	        xtype: 'hiddenfield',
	        name: 'resid',
	        value: ''
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