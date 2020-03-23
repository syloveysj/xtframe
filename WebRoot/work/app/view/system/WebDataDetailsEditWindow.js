Ext.define('XTFrame.view.system.WebDataDetailsEditWindow', {
	extend: 'Ext.window.Window',
	requires: [ 'Ext.form.*' ],
	action: 'gridEditWindow',
	title: '页面数据明细编辑',
	closeAction: 'hide',
	closable: false, 
	iconCls: 'edit-win',
	modal: true, 
	plain: true,
	resizable: false,
	items: {
		xtype: 'form',
		width: 500,
		height: 180,
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
			name:'execsortno',
			fieldLabel: '执行顺序',
			allowBlank:false,
			blankText:"不能为空，请填写",
			vtype: 'integer',
			columnWidth: 1.
		},{
			xtype:'textarea',
			name:'execcontent',
			fieldLabel: '执行内容',
			columnWidth: 1.
		},{
	        xtype: 'hiddenfield',
	        name: 'defid',
	        value: ''
	    },{
	        xtype: 'hiddenfield',
	        name: 'detid',
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