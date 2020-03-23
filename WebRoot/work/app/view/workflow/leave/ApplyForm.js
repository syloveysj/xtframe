Ext.define('XTFrame.view.workflow.leave.ApplyForm', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.workflowleaveApplyForm',
	requires: [ 'Ext.form.*' ],
//	collapsible: true,
	items: [{
		xtype: 'form',
		border: false,
        frame: true,
        layout: 'column',
		fieldDefaults: {
			labelAlign: 'right',
            labelWidth: 60,
            anchor: '98%'
		},
		items:[{
			xtype:'textfield',
			name:'day',
			fieldLabel: '请假天数',
			columnWidth: .5
		}]
	}],
	initComponent:function(){
		this.addEvents({'beforetasksubmit': true});
		this.addEvents({'tasksubmit': true});
		this.callParent(arguments);
	}
});