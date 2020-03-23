Ext.define('XTFrame.view.system.OrganDataEditWindow', {
	extend: 'Ext.window.Window',
	requires: [ 'Ext.form.*' ],
	action: 'gridEditWindow',
	title: '机构数据编辑',
	closeAction: 'hide',
	closable: false, 
	iconCls: 'edit-win',
	modal: true, 
	plain: true,
	resizable: false,
	items: {
		xtype: 'form',
		width: 400,
		height: 258,
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
			name:'paramename',
			fieldLabel: '数据名称',
			allowBlank:false,
			blankText:"不能为空，请填写",
			columnWidth: 1.
		},{
			xtype:'textarea',
			name:'paramevalue',
			fieldLabel: '数据值',
			columnWidth: 1.
		},{
			xtype:'textarea',
			name:'remark',
			fieldLabel: '备注',
			columnWidth: 1.
		},{
	        xtype: 'hiddenfield',
	        name: 'parameid',
	        value: ''
	    },{
	        xtype: 'hiddenfield',
	        name: 'orgid',
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