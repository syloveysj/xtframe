Ext.define('XTFrame.view.system.UserSearchWindow', {
	extend: 'Ext.window.Window',
	requires: [ 'Ext.form.*' ],
	action: 'gridSearchWindow',
	title: '员工查询',
	closeAction: 'hide',
	closable: false, 
	iconCls: 'icon-search',
	modal: true, 
	plain: true,
	resizable: false,
	items: {
		xtype: 'form',
		width: 280,
		height: 160,
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
			name:'userid',
			fieldLabel: '用户编号',
			columnWidth: 1.
		},{
			xtype: 'textfield',
			name:'username',
			fieldLabel: '账号',
			columnWidth: 1.
		},{
			xtype: 'textfield',
			name:'orgname',
			fieldLabel: '机构名称',
			columnWidth: 1.
		},{
			xtype: 'textfield',
			name:'jobname',
			fieldLabel: '岗位名称',
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