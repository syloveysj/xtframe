Ext.define('XTFrame.view.workflow.ProcessSettingBase', {
	extend: 'Ext.panel.Panel',
	requires: [ 'Ext.form.*' ],
	title: '基本信息',
	layout: 'fit',
	processRecord: null,
	initComponent:function(){
		Ext.apply(this,{
			items: {
				xtype: 'form',
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
					name:'processDefinitionId',
					fieldLabel: '流程定义名称',
					allowBlank:false,
					blankText:"不能为空，请填写",
					columnWidth: 1.
				},{
					xtype:'textfield',
					name:'processName',
					fieldLabel: '流程名称',
					columnWidth: 1.
				}],
				buttons: [{
					text:'保　存',
					action: 'settingSave',
					formBind: true
				},{
					text:'取　消',
					action: 'settingCancel'
				}]
			},
			setSetting: function(processRecord){
				if(this.processRecord!=null && this.processRecord.id==processRecord.id) return;
				this.processRecord = processRecord;
				var panel = this.down('form');
				var form = panel.getForm();
				form.findField("processDefinitionId").setValue(processRecord.id);
				form.findField("processName").setValue("");
			}
		});
		this.callParent(arguments);
	}
});