Ext.define('XTFrame.view.workflow.ProcessSettingFormEditWindow', {
	extend: 'Ext.window.Window',
	requires: [ 'Ext.form.*' ],
	action: 'gridEditWindow',
	title: '流程表单编辑',
	closeAction: 'hide',
	closable: false, 
	iconCls: 'edit-win',
	modal: true, 
	plain: true,
	resizable: false,
	items: {
		xtype: 'form',
		width: 400,
		height: 252,
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
			name:'formvalue',
			fieldLabel: '表单名称',
			allowBlank:false,
			blankText:"不能为空，请填写",
			columnWidth: 1.
		},{
			xtype:'textfield',
			name:'url',
			fieldLabel: '表单页面',
			columnWidth: 1.
		},{
			xtype:'textfield',
			name:'controller',
			fieldLabel: '控制器',
			columnWidth: 1.
		},{
			xtype:'textfield',
			name:'outcomes',
			fieldLabel: '决定项',
			columnWidth: 1.
		},{
			xtype:'textarea',
			name:'remark',
			fieldLabel: '备注',
			columnWidth: 1.
		},{
	        xtype: 'hiddenfield',
	        name: 'pageid',
	        value: ''
	    },{
	        xtype: 'hiddenfield',
	        name: 'processdefinitionid',
	        value: ''
	    },{
	        xtype: 'hiddenfield',
	        name: 'parameters',
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