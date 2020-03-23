Ext.define('XTFrame.view.system.SQLModuleEditWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.systemSQLModuleEditWindow',
	requires: [ 'Ext.form.*' ],
	title: 'SQL模块编辑',
	closeAction: 'hide',
	closable: false, 
	iconCls: 'edit-win',
	modal: true, 
	plain: true,
	resizable: false,
	items: {
		xtype: 'form',
		width: 500,
		height: 195,
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
			name:'modid',
			fieldLabel: '模块编号',
			readOnly: true,
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
			name:'modname',
			fieldLabel: '模块名称',
			allowBlank:false,
			blankText:"不能为空，请填写",
			columnWidth: 1.
		},{
			xtype:'textarea',
			name:'remark',
			fieldLabel: '备注',
			columnWidth: 1.
		},{
	        xtype: 'hiddenfield',
	        name: 'state',
	        value: ''
	    },{
	        xtype: 'hiddenfield',
	        name: 'modpid',
	        value: ''
	    },{
	        xtype: 'hiddenfield',
	        name: 'modidpath',
	        value: ''
	    },{
	        xtype: 'hiddenfield',
	        name: 'modlevel',
	        value: ''
	    }],
		buttons: [{
			text:'保　存',
			action: 'editSave',
			formBind: true
		},{
			text:'取　消',
			action: 'editCancel'
		}]
	}
});