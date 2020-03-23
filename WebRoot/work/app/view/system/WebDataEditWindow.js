Ext.define('XTFrame.view.system.WebDataEditWindow', {
	extend: 'Ext.window.Window',
	requires: [ 'Ext.form.*' ],
	action: 'gridEditWindow',
	title: '页面数据编辑',
	closeAction: 'hide',
	closable: false, 
	iconCls: 'edit-win',
	modal: true, 
	plain: true,
	resizable: false,
	items: {
		xtype: 'form',
		width: 500,
		height: 200,
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
			name:'dataname',
			fieldLabel: '数据名称',
			allowBlank:false,
			blankText:"不能为空，请填写",
			columnWidth: 1.
		},{
			xtype: 'combo',
			name:'exectype',
			fieldLabel: '执行类型',
			store: Ext.create('Ext.data.Store', {
				fields: ['text', 'value'],
			    data : [{text: '单条SQL', value: 'single_sql'},
			    		{text: '事务处理', value: 'transaction'},
			    		{text: '常量', value: 'final'},
			    		{text: '自定义', value: 'custom'}]
			}),
			queryMode: 'local',
			displayField: 'text',
			valueField: 'value',
			value: 'single_sql',
			selectOnFocus:true,
			editable:false,
			columnWidth: .5
		},{
			xtype:'textfield',
			name:'execsortno',
			fieldLabel: '执行顺序',
			allowBlank:false,
			blankText:"不能为空，请填写",
			vtype: 'integer',
			columnWidth: .5
		},{
			xtype:'textarea',
			name:'remark',
			fieldLabel: '备注',
			columnWidth: 1.
		},{
	        xtype: 'hiddenfield',
	        name: 'defid',
	        value: ''
	    },{
	        xtype: 'hiddenfield',
	        name: 'pageid',
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