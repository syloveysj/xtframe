Ext.define('XTFrame.view.system.JobEditWindow', {
	extend: 'Ext.window.Window',
	requires: [ 'Ext.form.*' ],
	alias: 'widget.systemJobEditWindow',
	action: 'gridEditWindow',
	title: '岗位编辑',
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
			name:'jobid',
			fieldLabel: '岗位编号',
			readOnly: true,
			columnWidth: 1.
		},{
			xtype:'textfield',
			name:'jobname',
			fieldLabel: '岗位名称',
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
	        name: 'jobidpath',
	        value: ''
	    },{
	        xtype: 'hiddenfield',
	        name: 'jobpid',
	        value: ''
	    },{
	        xtype: 'hiddenfield',
	        name: 'joblevel',
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