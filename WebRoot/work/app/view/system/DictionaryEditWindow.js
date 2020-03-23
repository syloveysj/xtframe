Ext.define('XTFrame.view.system.DictionaryEditWindow', {
	extend: 'Ext.window.Window',
	requires: [ 'Ext.form.*' ],
	action: 'gridEditWindow',
	title: '字典数据编辑',
	closeAction: 'hide',
	closable: false, 
	iconCls: 'edit-win',
	modal: true, 
	plain: true,
	resizable: false,
	items: {
		xtype: 'form',
		width: 400,
		height: 196,
		border: false,
        bodyPadding: 5,
        frame: true,
        layout: 'column',
		fieldDefaults: {
			labelAlign: 'right',
            labelWidth: 88,
            anchor: '98%'
		},
		items: [{
			xtype: 'textfield',
			name:'dicid',
			fieldLabel: '字典编码',
			allowBlank:false,
			blankText:"不能为空，请填写",
			columnWidth: .5
		},{
			xtype: 'textfield',
			name:'dicpid',
			fieldLabel: '上级编码',
			value: '-1',
			allowBlank:false,
			blankText:"不能为空，请填写",
			columnWidth: .5
		},{
			xtype:'textfield',
			name:'dicname',
			fieldLabel: '分类名称/名称',
			allowBlank:false,
			blankText:"不能为空，请填写",
			columnWidth: 1.
		},{
			xtype:'textarea',
			name:'dicvalue',
			fieldLabel: '内容',
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