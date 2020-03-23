Ext.define('XTFrame.controller.CRUD', {
	extend: 'Ext.app.Controller',
	init: function(){
		this.control({
			'button[action=gridAdd]': {
				click: this.gridAddClick
			},
			'button[action=gridEdit]': {
				click: this.gridEditClick
			},
			'button[action=gridDelete]': {
				click: this.gridDeleteClick
			},
			'button[action=gridSearch]': {
				click: this.gridSearchClick
			},
			'button[action=gridEditSave]': {
				click: this.gridEditSaveClick
			},
			'button[action=gridEditCancel]': {
				click: this.gridEditCancelClick
			},
			'button[action=gridSearchSubmit]': {
				click: this.gridSearchSubmitClick
			},
			'button[action=gridSearchCancel]': {
				click: this.gridSearchCancelClick
			},
			'window[action=gridEditWindow]':{
				show: this.gridEditWindowShow
			}
		});
	},
	gridAddClick: function(button, e){
		var grid = button.up('grid');
		var opt = {flag: true};
		grid.fireEvent('beforeupdate', grid, null, 'add', opt);
		if(!opt.flag) return ;
		
		var win = viewFactory.getWindow(grid.editWinId, grid.editWindow);
		win.flag = 'add';
		win.grid = grid;
		grid.editWindowObject = win;
		win.show();
	},
	gridEditClick: function(button, e){
		var grid = button.up('grid');
		var rows = grid.getSelectionModel().getSelection();
		if(rows.length != 1){
			Ext.xtframe.msg("提示", "请您选择一条数据进行编辑");
		} else {
			var opt = {flag: true};
			grid.fireEvent('beforeupdate', grid, null, 'edit', opt, rows[0]);
			if(!opt.flag) return ;
		
			var win = viewFactory.getWindow(grid.editWinId, grid.editWindow);
			win.flag = 'edit';
			win.grid = grid;
			grid.editWindowObject = win;
			win.show();
			var panel = win.down('form');
			var form = panel.getForm();
			form.loadRecord(rows[0]);
		}
	},
	gridDeleteClick: function(button, e){
		var grid = button.up('grid');
		var opt = {flag: true};
		grid.fireEvent('beforeupdate', grid, null, 'delete', opt);
		if(!opt.flag) return ;
		
		var rows = grid.getSelectionModel().getSelection();
		if(rows.length <= 0){
			Ext.xtframe.msg("提示", "您最少得选择一条数据");
		} else {
			Ext.MessageBox.confirm('确认删除', '你真的要删除所选记录吗?',
				function(btn){
					if(btn == 'yes') {
						var sqlId = grid.deleteSql;
						var arrValue = new Array();
						Ext.Array.each(rows, function(record){
							arrValue.push({
								sqlID: sqlId,
								parameters: pubOPT.getFormValues(record.data, grid.deleteValues)
							});
						});
						Ext.get(grid.getId()).mask('请稍后...');
						ajaxUtil.executeTransaction(arrValue, {
							async: true,
							success: function(data) {
								Ext.get(grid.getId()).unmask();
								if(ajaxUtil.isSucceed(data)){
									grid.fireEvent('update', grid, 'delete', opt);
									grid.getStore().load();
									Ext.xtframe.msg("提示", "删除成功！");
								}else{
									Ext.xtframe.msg("提示", "删除失败！");
								}
							},
							failure: function() {
								Ext.get(grid.getId()).unmask();
								Ext.xtframe.msg("提示", "删除失败！");
							}
						});
					}});
		}
	},
	gridSearchClick: function(button, e){
		var grid = button.up('grid');
		var opt = {flag: true};
		grid.fireEvent('beforeupdate', grid, null, 'search', opt);
		if(!opt.flag) return ;
		
		var win = viewFactory.getWindow(grid.searchWinId, grid.searchWindow);
		win.grid = grid;
		grid.searchWindowObject = win;
		win.show();
	},
	gridEditSaveClick: function(button, e){
		var win = button.up('window');
		var grid = win.grid;
		var opt = {flag: true};
		grid.fireEvent('beforeupdate', grid, win, 'editsave', opt);
		if(!opt.flag) return ;
		
		var panel = button.up('form');
		var form = panel.getForm();
		var formObject = form.getValues();
		var sqlID, arrValue;
		if(win.flag == 'add'){
			sqlID = grid.addSql;
			arrValue = pubOPT.getFormValues(formObject, grid.addValues);
//			console.log(arrValue);
			Ext.get(panel.getId()).mask('请稍后...');
			ajaxUtil.executeUpdate(sqlID, arrValue, {
				async: true,
				success: function(data) {
					Ext.get(panel.getId()).unmask();
					if(ajaxUtil.isSucceed(data)){
						grid.fireEvent('update', grid, 'add', opt);
						grid.getStore().load();
						win.hide();
						Ext.xtframe.msg("提示", "保存成功！");
					}else{
						Ext.xtframe.msg("提示", "保存失败！");
					}
				},
				failure: function() {
					Ext.get(panel.getId()).unmask();
					Ext.xtframe.msg("提示", "保存失败！");
				}
			});
		}else if(win.flag == 'edit'){
			sqlID = grid.editSql;
			arrValue = pubOPT.getFormValues(formObject, grid.editValues);
			Ext.get(panel.getId()).mask('请稍后...');
			ajaxUtil.executeUpdate(sqlID, arrValue, {
				async: true,
				success: function(data) {
					Ext.get(panel.getId()).unmask();
					if(ajaxUtil.isSucceed(data)){
						grid.fireEvent('update', grid, 'edit', opt);
						grid.getStore().load();
						win.hide();
						Ext.xtframe.msg("提示", "编辑成功！");
					}else{
						Ext.xtframe.msg("提示", "编辑失败！");
					}
				},
				failure: function() {
					Ext.get(panel.getId()).unmask();
					Ext.xtframe.msg("提示", "编辑失败！");
				}
			});
		}
	},
	gridSearchSubmitClick: function(button, e){
		var win = button.up('window');
		var opt = {flag: true};
		var grid = win.grid;
		grid.fireEvent('beforeupdate', grid, win, 'searchsubmit', opt);
		if(!opt.flag) return ;
		
		var panel = button.up('form');
		var form = panel.getForm();
		var formObject = form.getValues();
		Ext.Array.each(grid.searchValues, function(v){
			grid[v] = formObject[v];
		});
		grid.getStore().loadPage(1);
		win.hide();
	},
	gridEditCancelClick: function(button, e){
		var win = button.up('window');
		win.hide();
	},
	gridSearchCancelClick: function(button, e){
		var win = button.up('window');
		win.hide();
	},
	gridEditWindowShow: function(win){
		var panel = win.down('form');
		var form = panel.getForm();
		form.reset();
	}
});