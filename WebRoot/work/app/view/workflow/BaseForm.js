Ext.define('XTFrame.view.workflow.BaseForm', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.workflowBaseForm',
	requires: [ 'Ext.form.*' ],
//	collapsible: true,
	height: 158,
	gridView: null,//需要接收事件的grid
	parentView: null,//操作事件派发的对象
	taskId: null,//任务ID
	pageId: null,//表单页面ID
	isWindow: true,//是否是窗口表单
	initComponent:function(){
		this.outcome = Ext.create('Ext.form.RadioGroup', {
			xtype: 'radiogroup',
			fieldLabel: '决定:',
			columnWidth: 1.,
			hidden:true
		});
		Ext.apply(this,{
			items: [{
				xtype: 'form',
				border: false,
		        frame: true,
		        layout: 'column',
				fieldDefaults: {
					labelAlign: 'right',
		            labelWidth: 40,
		            anchor: '98%'
				},
				items: [{
					xtype: 'fieldset',
					title: '基本信息',
					columnWidth: 1.,
					layout: 'column',
					items:[{
						xtype:'textarea',
						name:'opinion',
						fieldLabel: '意见',
						columnWidth: 1.
					},
					this.outcome]
				}],
				buttons: [{
					text:'保　存',
					action: 'taskSave'
				},{
					text:'提　交',
					action: 'taskSubmit'
				},{
					text:'取　消',
					action: 'taskCancel'
				}]
			}],
			setOutcome: function (outcomes){
				if(Ext.isEmpty(outcomes)) return;
				this.setHeight(186);
				this.outcome.setVisible(true);
				var params = outcomes.split('|');
				var list = [];
				Ext.Array.each(params, function (v){
					list.push({boxLabel: v, inputValue: v, name: 'outcome'});
				});
				list[0].checked = true;
				this.outcome.add(list);
			}
		});
		this.callParent(arguments);
	}
});