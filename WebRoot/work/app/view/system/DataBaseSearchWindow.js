Ext.define('XTFrame.view.system.DataBaseSearchWindow', {
	extend: 'Ext.window.Window',
	requires: [ 'Ext.form.*' ],
	action: 'gridSearchWindow',
	title: '数据库查询',
	closeAction: 'hide',
	closable: false, 
	iconCls: 'icon-search',
	modal: true, 
	plain: true,
	resizable: false,
	items: {
		xtype: 'form',
		width: 280,
		height: 80,
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
			xtype: 'textfield',
			name:'jndiname',
			fieldLabel: 'JNDIName',
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