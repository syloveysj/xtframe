Ext.define('XTFrame.view.system.SQLSearchWindow', {
	extend: 'Ext.window.Window',
	requires: [ 'Ext.form.*' ],
	action: 'gridSearchWindow',
	title: 'SQL查询',
	closeAction: 'hide',
	closable: false, 
	iconCls: 'icon-search',
	modal: true, 
	plain: true,
	resizable: false,
	items: {
		xtype: 'form',
		width: 280,
		height: 108,
		border: false,
        bodyPadding: 5,
        frame: true,
        layout: 'column',
		fieldDefaults: {
			labelAlign: 'right',
            labelWidth: 55,
            anchor: '98%'
		},
		items: [{
			xtype: 'combo',
			name:'dbtype',
			fieldLabel: '数据库',
			store: Ext.create('Ext.data.Store', {
				fields: ['text', 'value'],
			    data : [{text: '全部', value: ''},
			    		{text: 'mysql', value: 'mysql'},
			    		{text: 'oracle', value: 'oracle'}]
			}),
			queryMode: 'local',
			displayField: 'text',
			valueField: 'value',
			value: '',
			selectOnFocus:true,
			editable:false,
			columnWidth: 1.
		},{
			xtype: 'textfield',
			name:'sqlid',
			fieldLabel: 'SQL编号',
			columnWidth: 1.
		}],
		buttons: [{
			text:'查　询',
			action: 'gridSearchSubmit'
		},{
			text:'取　消',
			action: 'gridSearchCancel'
		}]
	}
});