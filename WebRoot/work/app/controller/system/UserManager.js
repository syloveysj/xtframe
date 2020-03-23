Ext.define('XTFrame.controller.system.UserManager', {
	extend: 'Ext.app.Controller',
	init: function(){
		this.control({
			'systemUserManager': {
				beforeupdate: function(grid, win, mark, opt){
					var panel, form;
					if(mark=='add' || mark=='edit'){
						win = viewFactory.getWindow(grid.editWinId, grid.editWindow);
						var organData = this.getOrganData();
						if(organData == null){
							opt.flag = false;
							return;
						}
						win.show();
						panel = win.down('form');
						var showPhoto = panel.down("image[name=showPhoto]");
						if(mark == 'edit'){
							var data = grid.getSelectionModel().getSelection()[0].data;
							if(!Ext.isEmpty(data.photo)) showPhoto.setSrc(data.photo);
							else showPhoto.setSrc("/work/resources/images/icons/defaultphoto.png");
						} else {
							showPhoto.setSrc("/work/resources/images/icons/defaultphoto.png");
						}
						form = panel.getForm();
						form.findField("orgid").getStore().loadData(organData);
					} else if(mark=='editsave' && win.flag=='edit'){
						panel = win.down('form');
						form = panel.getForm();
						if(Ext.isEmpty(form.findField("pwd").getValue())){
							opt.flag = false;
							var formObject = form.getValues();
							var sqlID = 'xtframe_user_manage_7';
							var arrValue = pubOPT.getFormValues(formObject, grid.editValues);
							Ext.get(panel.getId()).mask('请稍后...');
							ajaxUtil.executeUpdate(sqlID, arrValue, {
								async: true,
								success: function(data) {
									Ext.get(panel.getId()).unmask();
									if(ajaxUtil.isSucceed(data)){
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
					}
				},
				storebeforeload: function(grid){
					var onlineusers, serverData = ajaxUtil.serverData("useronlinecode");
					if(ajaxUtil.isSucceed(serverData)) onlineusers = serverData.data;
					else onlineusers = [];
					grid.onlineusers = onlineusers;
				}
			},
			'systemUserManager button[action=userGray]': {
				click: function (button, e){
					var grid = button.up('grid');
					var rows = grid.getSelectionModel().getSelection();
					if(rows.length != 1){
						Ext.xtframe.msg("提示", "请您选择一条数据进行授权");
					} else {
						var win = viewFactory.getWindow('userSetGrayWindow', 'XTFrame.view.system.SetGrayWindow');
						this.initWindow(win, rows[0].data, "xtframe_user_role_0", 'userGray', "用户授权");
					}
				}
			},
			'systemUserManager button[action=userGrayGray]': {
				click: function (button, e){
					var grid = button.up('grid');
					var rows = grid.getSelectionModel().getSelection();
					if(rows.length != 1){
						Ext.xtframe.msg('提示', '请您选择一条数据进行授权权');
					} else {
						var win = viewFactory.getWindow('userSetGrayWindow', 'XTFrame.view.system.SetGrayWindow');
						this.initWindow(win, rows[0].data, "xtframe_user_optrole_0", 'userGrayGray', "用户授权权");
					}
				}
			},
			'systemSetGrayWindow[winId=userSetGrayWindow] button[action=saveGray]': {
				click: function (button, e){
					var win = button.up('systemSetGrayWindow');
					if(win.flag=='userGray' || win.flag=='userGrayGray'){
						var sql1 = win.flag=='userGray' ? "xtframe_user_role_1" : "xtframe_user_optrole_1";
						var sql2 = win.flag=='userGray' ? "xtframe_user_role_2" : "xtframe_user_optrole_2";
						var grid = win.grid;
						var arrSqlValue = new Array(),
							roleData = new Array(),
							rows = grid.getSelectionModel().getSelection();
						arrSqlValue.push({sqlID:sql1, parameters:{userid:win.userid}});
						Ext.Array.each(rows, function(record){
							roleData.push({roleid: record.data.roleId});
							arrSqlValue.push({sqlID:sql2, parameters:{userid:win.userid, roleid:record.data.roleId}});
						});
						var data = ajaxUtil.executeTransaction(arrSqlValue);
						if(ajaxUtil.isSucceed(data)){
							win.roleData = roleData;
							Ext.xtframe.msg("提示", "保存成功！");
						} else {
							Ext.xtframe.msg("提示", "保存失败！");
						}
					}
				}
			},
			'systemSetGrayWindow[winId=userSetGrayWindow] button[action=resetGray]': {
				click: function (button, e){
					var win = button.up('systemSetGrayWindow');
					if(win.flag=='userGray' || win.flag=='userGrayGray'){
						this.setGridCheck(win.grid, win.roleData, 'roleId', 'roleid');
					}
				}
			},
			'systemUserEditWindow': {
				uploadsuccess: function(win, data, action){
					var uew = win.parentView;
					var panel = uew.down('form');
					panel.down("image[name=showPhoto]").setSrc(data.url);
					var form = panel.getForm();
					form.findField("photo").setValue(data.url);
					win.close();
				}
			},
			'systemUserEditWindow combo[name=orgid]': {
				change: function(cb, newValue, oldValue){
					var panel = cb.up('form');
					var form = panel.getForm();
					var cbJobId = form.findField("jobid");
					cbJobId.getStore().loadData(this.getJobData(newValue));
					cbJobId.setValue(0);
				}
			}
		});
	},
	organData: null,
	jobDatas: Ext.create('Ext.util.MixedCollection'),
	optRole: null,
	getOptRole: function(){
		if(this.optRole == null){
			var serverData = ajaxUtil.serverData("optrole", "");
			if(ajaxUtil.isSucceed(serverData)){
				this.optRole = serverData.data;
			} else {
				Ext.xtframe.msg("提示", "数据加载失败！");
			}
		}
		return this.optRole;
	},
	initWindow: function(win, row, sql, flag, title){
		win.flag = flag;
		win.userid = row.userid;
		win.setTitle(row.username + "->" + title);
		win.show();
		win.grid.getStore().loadData(this.getOptRole());
		var data = ajaxUtil.executeQuery(sql, {userid:row.userid});
		if(ajaxUtil.isSucceed(data)){
			this.setGridCheck(win.grid, data.rows, 'roleId', 'roleid');
			win.roleData = data.rows;
		} else {
			win.close();
			Ext.xtframe.msg("提示", title+"数据加载失败");
		}
	},
	clearGridCheck: function(grid){
		var model = grid.getSelectionModel();
		model.deselect(model.getSelection());
	},
	setGridCheck: function(grid, ls, gridKey, lsKey){
		this.clearGridCheck(grid);
		if(Ext.isEmpty(ls)) return;
		var model = grid.getSelectionModel();
		var store = grid.getStore();
		store.each(function(record){
			Ext.Array.each(ls, function(data) {
				if(data[lsKey] == record.data[gridKey]){
					model.selectRange(record, record, true);
					return false;
				}
			});
		});
	},
	getOrganData: function(){
		var data = ajaxUtil.executeQuery('xtframe_user_manage_5', {orgidpath:""});
		if(ajaxUtil.isSucceed(data)){
			this.organData = data.rows;
		} else {
			Ext.xtframe.msg("提示", "数据加载失败");
		}
		return this.organData;
	},
	getJobData: function(orgid){
		if(!orgid) return [];
		if(this.jobDatas.containsKey(orgid)){
			return this.jobDatas.get(orgid);
		}
		var jobData = null;
		var data = ajaxUtil.executeQuery('xtframe_user_manage_6', {orgid:orgid});
		if(ajaxUtil.isSucceed(data)){
			jobData = data.rows;
			this.jobDatas.add(orgid, jobData);
		} else {
			Ext.xtframe.msg("提示", "机构数据加载失败");
		}
		if(jobData == null) jobData = [];
		jobData.unshift({jobid:0, jobname:'未设置'});
		return jobData;
	}
});