Ext.define('XTFrame.controller.system.DataBaseManager', {
	extend: 'Ext.app.Controller',
	init: function(){
		this.control({
			'systemDataBaseManager button[action=setting]': {
				click: function (button, e){
					var grid = button.up('grid');
					var rows = grid.getSelectionModel().getSelection();
					if(rows.length != 1){
						Ext.xtframe.msg("提示", "请您选择一条数据进行设置");
					} else {
						var win = viewFactory.getWindow('databaseDragDropWindow', 'XTFrame.view.system.DataBaseDragDropWindow');
						this.initWindow(win, rows[0].data);
					}
				}
			},
			'systemDataBaseManager button[action=clear]': {
				click: function (button, e){
					var data = ajaxUtil.executeUpdate("xtframe_database_manage_10");
					if(ajaxUtil.isSucceed(data)){
						var info = "数据库关联SQL清理成功！<br/>";
						info += "database_sql清理["+data.iRow+"]条记录";
						Ext.Msg.alert("提示", info);
					} else {
						Ext.xtframe.msg("提示", "清理失败！");
					}
				}
			},
			'systemDataBaseDragDropWindow button[action=sqlSearch]': {
				click: function (button, e){
					var grid = button.up('grid');
					var sm = grid.getSelectionModel();
					var store = grid.getStore();
					var key = grid.searchKey.getValue();
					if(key.length < 1) return ;
					var flag = false;
					store.each(function(record){
						if(record.data['sqlid'].indexOf(key) >= 0){
							sm.selectRange(record, record);
							flag = true;
							return false;
						}
					});
					if(!flag){
						Ext.xtframe.msg("提示", "未发现要查找的SQL编号["+key+"]");
					}
				}
			},
			'systemDataBaseDragDropWindow button[action=sqlSearch]': {
				click: function (button, e){
					var grid = button.up('grid');
					var sm = grid.getSelectionModel();
					var store = grid.getStore();
					var key = grid.searchKey.getValue();
					if(key.length < 1) return ;
					var flag = false;
					store.each(function(record){
						if(record.data['sqlid'].indexOf(key) >= 0){
							sm.selectRange(record, record);
							flag = true;
							return false;
						}
					});
					if(!flag){
						Ext.xtframe.msg("提示", "未发现要查找的SQL编号["+key+"]");
					}
				}
			},
			'systemDataBaseDragDropWindow button[action=saveDataBaseSql]': {
				click: function (button, e){
					var grid = button.up('grid');
					var store = grid.getStore();
					var jndiname = grid.jndiname;
					var arrValue = [{sqlID:'xtframe_database_manage_8',parameters:{jndiname:jndiname}}];
					store.each(function(record){
						arrValue.push({sqlID:'xtframe_database_manage_9',parameters:{jndiname:jndiname,sqlid:record.data['sqlid']}});
					});
					var win = Ext.get(grid.up('window').getId());
					win.mask('请稍后...');
					ajaxUtil.executeTransaction(arrValue, {
						async: true,
						success: function(data) {
							win.unmask();
							if(ajaxUtil.isSucceed(data)){
								Ext.xtframe.msg("提示", "保存成功！");
							}else{
								Ext.xtframe.msg("提示", "保存失败！");
							}
						},
						failure: function() {
							win.unmask();
							Ext.xtframe.msg("提示", "保存失败！");
						}
					});
				}
			}
		});
	},
	originalData: null,
	initWindow: function(win, row){
		win.jnidname = row.jndiname;
		win.title = "设置[<font color='red'>"+row.jndiname+"</font>]作用SQL(<font color='green'>提示：本窗口进行拖拽操作，左边为未作用的SQL，右边为本数据库作用的SQL</font>)",
		win.show();
		win.gridCenter.jndiname = row.jndiname;
		win.gridWest.searchKey.setValue('');
		win.gridCenter.searchKey.setValue('');
		win.gridWest.getStore().loadData(this.getOriginalData(row.dbtype));
		win.gridCenter.getStore().loadData(this.getNewData(row.jndiname, row.dbtype));
	},
	getOriginalData: function(dbtype){
		var data = ajaxUtil.executeQuery('xtframe_database_manage_6', {dbtype:dbtype});
		if(ajaxUtil.isSucceed(data)){
			this.originalData = data.arrData;
		} else {
			Ext.xtframe.msg("提示", "数据加载失败");
		}
		return this.originalData;
	},
	getNewData: function(jndiname, dbtype){
		var data = ajaxUtil.executeQuery('xtframe_database_manage_7', {jndiname:jndiname,dbtype:dbtype});
		if(ajaxUtil.isSucceed(data)){
			this.originalData = data.arrData;
		} else {
			Ext.xtframe.msg("提示", "数据加载失败");
		}
		return this.originalData;
	}
});