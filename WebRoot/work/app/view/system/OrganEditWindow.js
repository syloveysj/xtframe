Ext.define('XTFrame.view.system.OrganEditWindow', {
	extend: 'Ext.window.Window',
	requires: [ 'Ext.form.*' ],
	alias: 'widget.systemOrganEditWindow',
	action: 'gridEditWindow',
	title: '机构编辑',
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
			xtype: 'textfield',
			name:'orgid',
			fieldLabel: '机构编号',
			readOnly: true,
			columnWidth: 1.
		},{
			xtype:'textfield',
			name:'orgname',
			fieldLabel: '机构名称',
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
			xtype:'textarea',
			name:'remark',
			fieldLabel: '备注',
			columnWidth: 1.
		},{
	        xtype: 'hiddenfield',
	        name: 'orgidpath',
	        value: ''
	    },{
	        xtype: 'hiddenfield',
	        name: 'orgpid',
	        value: ''
	    },{
	        xtype: 'hiddenfield',
	        name: 'orglevel',
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