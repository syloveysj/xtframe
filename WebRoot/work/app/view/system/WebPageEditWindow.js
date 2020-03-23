Ext.define('XTFrame.view.system.WebPageEditWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.systemWebPageEditWindow',
	requires: [ 'Ext.form.*' ],
	title: '页面编辑',
	closeAction: 'hide',
	closable: false, 
	iconCls: 'edit-win',
	modal: true, 
	plain: true,
	resizable: false,
	items: {
		xtype: 'form',
		width: 500,
		height: 246,
		border: false,
        bodyPadding: 5,
        frame: true,
        layout: 'column',
		fieldDefaults: {
			labelAlign: 'right',
            labelWidth: 80,
            anchor: '98%'
		},
		items: [{
			xtype: 'textfield',
			name:'pageid',
			fieldLabel: '页面编号',
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
			name:'pagename',
			fieldLabel: '页面名称',
			allowBlank:false,
			blankText:"不能为空，请填写",
			columnWidth: .7
		},{
			xtype: 'combo',
			name:'ablecache',
			fieldLabel: '是否缓存',
			store: Ext.create('Ext.data.Store', {
				fields: ['text', 'value'],
			    data : [{text: '是', value: '1'},
			    		{text: '否', value: '0'}]
			}),
			queryMode: 'local',
			displayField: 'text',
			valueField: 'value',
			value: '0',
			selectOnFocus:true,
			editable:false,
			columnWidth: .3
		},{
			xtype: 'combo',
			name:'pagetemplettype',
			fieldLabel: '类型',
			store: Ext.create('Ext.data.Store', {
				fields: ['text', 'value'],
			    data : [{text: 'ftl', value: 'ftl'},
			    		{text: 'jsp', value: 'jsp'},
			    		{text: 'json', value: 'json'}]
			}),
			queryMode: 'local',
			displayField: 'text',
			valueField: 'value',
			value: 'ftl',
			selectOnFocus:true,
			editable:false,
			columnWidth: .3
		},{
			xtype:'textfield',
			name:'pagetempletpath',
			fieldLabel: '页面模版路径',
			columnWidth: .7
		},{
			xtype: 'combo',
			name:'errorpagetemplettype',
			fieldLabel: '类型',
			store: Ext.create('Ext.data.Store', {
				fields: ['text', 'value'],
			    data : [{text: 'ftl', value: 'ftl'},
			    		{text: 'jsp', value: 'jsp'},
			    		{text: 'json', value: 'json'}]
			}),
			queryMode: 'local',
			displayField: 'text',
			valueField: 'value',
			value: 'ftl',
			selectOnFocus:true,
			editable:false,
			columnWidth: .3
		},{
			xtype:'textfield',
			name:'errorpagetempletpath',
			fieldLabel: '出错模版路径',
			columnWidth: .7
		},{
			xtype:'textarea',
			name:'remark',
			fieldLabel: '备注',
			columnWidth: 1.
		},{
	        xtype: 'hiddenfield',
	        name: 'pagepid',
	        value: ''
	    },{
	        xtype: 'hiddenfield',
	        name: 'pageidpath',
	        value: ''
	    },{
	        xtype: 'hiddenfield',
	        name: 'pagelevel',
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