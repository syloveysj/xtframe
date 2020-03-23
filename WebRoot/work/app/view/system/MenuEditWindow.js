Ext.define('XTFrame.view.system.MenuEditWindow', {
	extend: 'Ext.window.Window',
	requires: [ 'Ext.form.*' ],
	alias: 'widget.systemMenuEditWindow',
	action: 'gridEditWindow',
	title: '菜单编辑',
	closeAction: 'hide',
	closable: false, 
	iconCls: 'edit-win',
	modal: true, 
	plain: true,
	resizable: false,
	initComponent:function(){
		this.menuTypeStore = Ext.create('Ext.data.Store', {
			fields: ['text', 'value'],
		    data : [{text: '普通', value: 1},
		    		{text: '窗口', value: 2}]
		});
		Ext.apply(this,{
			items: {
				xtype: 'form',
				width: 400,
				height: 274,
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
					name:'menuid',
					fieldLabel: '菜单编号',
					readOnly: true,
					columnWidth: .6
				},{
					xtype: 'combo',
					name:'menutype',
					fieldLabel: '类型',
					store : this.menuTypeStore,
					emptyText: '请选择',
					queryMode: 'local',
					displayField: 'text',
					valueField: 'value',
					value: 1,
					selectOnFocus:true,
					editable:false,
					columnWidth: .4
				},{
					xtype:'textfield',
					name:'menuname',
					fieldLabel: '菜单名称',
					allowBlank:false,
					blankText:"不能为空，请填写",
					columnWidth: .6
				},{
					xtype:'textfield',
					name:'sortno',
					fieldLabel: '序号',
					allowBlank:false,
					blankText:"不能为空，请填写",
					vtype: 'integer',
					columnWidth: .4
				},{
					xtype:'textfield',
					name:'menuicon',
					fieldLabel: '菜单图标',
					columnWidth: 1.
				},{
					xtype:'textfield',
					name:'url',
					fieldLabel: 'URL',
					columnWidth: 1.
				},{
					xtype:'textfield',
					name:'swfurl',
					fieldLabel: 'SwfURL',
					columnWidth: 1.
				},{
					xtype:'textarea',
					name:'remark',
					fieldLabel: '备注',
					columnWidth: 1.
				},{
			        xtype: 'hiddenfield',
			        name: 'menupid',
			        value: ''
			    },{
			        xtype: 'hiddenfield',
			        name: 'menuidpath',
			        value: ''
			    },{
			        xtype: 'hiddenfield',
			        name: 'menulevel',
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
		this.callParent(arguments);
	}
});