Ext.define('XTFrame.controller.workflow.ProcessSetting', {
	extend: 'Ext.app.Controller',
	init: function(){
		this.control({
			'workflowProcessSettingWindow': {
				show: function (win){
					var tabs = win.down('workflowProcessSettingTab');
					tabs.setActiveTab(0);
					var tab = tabs.getActiveTab();
					tab.setSetting(win.processRecord);
				}
			},
			'workflowProcessSettingTab': {
				tabchange: function (tabPanel, newCard, oldCard){
					var win = tabPanel.up('workflowProcessSettingWindow');
					newCard.setSetting(win.processRecord);
				}
			},
			'workflowProcessSettingForm': {
				beforeupdate: function (grid, win, mark, opt, record){
					var parameters, w, panel, form;
					if(mark == 'edit'){
						parameters = ajaxUtil.evalJSON(record.data.parameters);
						if(!Ext.isEmpty(parameters)){
							w = viewFactory.getWindow(grid.editWinId, grid.editWindow);
							w.show();
							panel = w.down('form');
							form = panel.getForm();
							if(!Ext.isEmpty(parameters.url)){
								form.findField("url").setValue(parameters.url);
							}
							if(!Ext.isEmpty(parameters.controller)){
								form.findField("controller").setValue(parameters.controller);
							}
							if(!Ext.isEmpty(parameters.outcomes)){
								form.findField("outcomes").setValue(parameters.outcomes);
							}
						}
					}
					if(mark == 'editsave'){
						panel = win.down('form');
						form = panel.getForm();
						parameters = {};
						parameters.url = Ext.String.trim(form.findField("url").getValue());
						parameters.controller = Ext.String.trim(form.findField("controller").getValue());
						parameters.outcomes = Ext.String.trim(form.findField("outcomes").getValue());
						form.findField("parameters").setValue(Ext.JSON.encode(parameters));
						form.findField("processdefinitionid").setValue(grid.processRecord.id);
					}
				}
			},
			'workflowProcessSettingForm button[action=pageSearch]': {
				click: function (button){
					var grid = button.up('grid');
					grid.getStore().loadPage(1);
				}
			}
		});
	}
});