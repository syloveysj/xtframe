Ext.define('XTFrame.view.system.SQLEditWindow', {
	extend: 'Ext.window.Window',
	requires: [ 'Ext.form.*' ],
	action: 'gridEditWindow',
	title: 'SQL编辑',
	closeAction: 'hide',
	closable: false, 
	iconCls: 'edit-win',
	modal: true, 
	plain: true,
	resizable: false,
	items: {
		xtype: 'form',
		width: 500,
		height: 395,
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
			name:'sqlid',
			fieldLabel: 'SQL编号',
			allowBlank:false,
			blankText:"不能为空，请填写",
			vtype: 'alphanum',
			columnWidth: .7
		},{
			xtype: 'combo',
			name:'dbtype',
			fieldLabel: '数据库',
			store: Ext.create('Ext.data.Store', {
				fields: ['text', 'value'],
			    data : [{text: 'mysql', value: 'mysql'},
			    		{text: 'oracle', value: 'oracle'}]
			}),
			queryMode: 'local',
			displayField: 'text',
			valueField: 'value',
			value: 'mysql',
			selectOnFocus:true,
			editable:false,
			columnWidth: .3
		},{
			xtype:'textfield',
			name:'sqlname',
			fieldLabel: 'SQL名称',
			allowBlank:false,
			blankText:"不能为空，请填写",
			columnWidth: .7
		},{
			xtype: 'combo',
			name:'exectype',
			fieldLabel: 'SQL类型',
			store: Ext.create('Ext.data.Store', {
				fields: ['text', 'value'],
			    data : [{text: '查询', value: 'select'},
			    		{text: '插入', value: 'insert'},
			    		{text: '编辑', value: 'update'},
			    		{text: '删除', value: 'delete'}]
			}),
			queryMode: 'local',
			displayField: 'text',
			valueField: 'value',
			value: 'select',
			selectOnFocus:true,
			editable:false,
			columnWidth: .3
		},{
			xtype:'textfield',
			name:'syscode',
			fieldLabel: '系统编码',
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
			name:'sqltemplet',
			fieldLabel: '模型',
			columnWidth: 1.
		},{
			xtype:'textarea',
			name:'dataverify',
			fieldLabel: '验证规则',
			columnWidth: 1.
		},{
			xtype:'textarea',
			name:'remark',
			fieldLabel: '备注',
			columnWidth: 1.
		},{
	        xtype: 'hiddenfield',
	        name: 'modid',
	        value: ''
	    }],
//		buttonAlign: 'center',//按钮居中
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