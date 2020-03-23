Ext.define('XTFrame.controller.system.DictionaryManager', {
	extend: 'Ext.app.Controller',
	init: function(){
		this.control({
			'systemDictionaryManagerLeft': {
				beforeupdate: function(grid, win, mark, opt){
					var win;
					if(mark == 'add'){
						win = viewFactory.getWindow(grid.editWinId, grid.editWindow).show();
						win.down('form').getForm().findField("dicid").setReadOnly(false);
						win.down('form').getForm().findField("dicpid").setReadOnly(false);
					} else if(mark == 'edit'){
						win = viewFactory.getWindow(grid.editWinId, grid.editWindow).show();
						win.down('form').getForm().findField("dicid").setReadOnly(true);
						win.down('form').getForm().findField("dicpid").setReadOnly(false);
					}
				}
			},
			'systemDictionaryManagerRight': {
				beforeupdate: function(grid, win, mark, opt){
					var win, dicid, dicpid;
					if(mark == 'add'){
						if(grid.dicpid == ''){
							opt.flag = false;
							return;
						}
						win = viewFactory.getWindow(grid.editWinId, grid.editWindow).show();
						dicid = win.down('form').getForm().findField("dicid");
						dicid.setValue(grid.dicpid+'-');
						dicid.setReadOnly(false);
						dicpid = win.down('form').getForm().findField("dicpid");
						dicpid.setValue(grid.dicpid);
						dicpid.setReadOnly(true);
					} else if(mark == 'edit'){
						win = viewFactory.getWindow(grid.editWinId, grid.editWindow).show();
						win.down('form').getForm().findField("dicid").setReadOnly(true);
						win.down('form').getForm().findField("dicpid").setReadOnly(true);
					}
				}
			},
			'systemDictionaryManagerLeft button[action=lookList]': {
				click: function (button, e){
					var grid = button.up('grid');
					var rows = grid.getSelectionModel().getSelection();
					if(rows.length == 1){
						var row = rows[0].data;
						var grid2 = grid.up('panelBorder').down('systemDictionaryManagerRight');
						grid2.dicpid = row.dicid;
						grid2.dictionaryText.setText("<font color='red'>"+row.dicid+" ["+row.dicname+"]</font>");
						grid2.getStore().loadPage(1);
					} else {
						Ext.xtframe.msg("提示", "请您选择一个字典");
					}
				}
			}
		});
	}
});