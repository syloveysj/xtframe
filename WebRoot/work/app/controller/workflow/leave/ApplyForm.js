Ext.define('XTFrame.controller.workflow.leave.ApplyForm', {
	extend: 'Ext.app.Controller',
	init: function(){
		this.control({
			'workflowleaveApplyForm': {
				beforetasksubmit: function(view, baseForm, opt){
					var panel = view.down('form');
					var form = panel.getForm();
					var formObject = form.getValues();
					var variables = {day: formObject.day};
					opt.variables = variables;
				},
				tasksubmit: function(view, baseForm, opt, data){
					view.up('window').close();
				}
			}
		});
	}
});