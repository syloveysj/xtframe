Ext.define('XTFrame.controller.system.JobManager', {
	extend: 'Ext.app.Controller',
	init: function(){
		this.control({
			'systemJobManagerTree': {
				itemclick: function(tree, record, item, index, e){
					var layout = tree.up('panelBorder');
					var grid = layout.down('systemJobManagerGrid');
					grid.jobidpath = record.raw ? record.raw.jobidpath : record.data.jobidpath;
					grid.jobid = record.raw ? record.raw.jobid : record.data.jobid;
					grid.getStore().loadPage(1);
				},
				initcomplete: function(tree){
					this.refreshJob(tree);
				}
			},
			'systemJobManagerTree tool[type=refresh]': {
				click: function(o, e){
					this.refreshJob(o.up('systemJobManagerTree'));
				}
			},
			'systemJobManagerGrid': {
				beforeupdate: function(grid, win, mark, opt){
					if(mark == 'editsave'){
						this.gridEditSaveClick(grid, win, mark, opt);
					}
				},
				update: function (grid, flag){
					var layout = grid.up('panelBorder');
					this.refreshJob(layout.down('systemJobManagerTree'));
				}
			},
			'systemJobManagerGrid button[action=userGray]': {
				click: function (button, e){
					var grid = button.up('grid');
					var rows = grid.getSelectionModel().getSelection();
					if(rows.length != 1){
						Ext.xtframe.msg("提示", "请您选择一条数据进行授权");
					} else {
						var win = viewFactory.getWindow('jobSetGrayWindow', 'XTFrame.view.system.SetGrayWindow');
						this.initWindow(win, rows[0].data, "xtframe_job_role_0", 'jobGray', "岗位授权");
					}
				}
			},
			'systemJobManagerGrid button[action=userGrayGray]': {
				click: function (button, e){
					var grid = button.up('grid');
					var rows = grid.getSelectionModel().getSelection();
					if(rows.length != 1){
						Ext.xtframe.msg("提示", "请您选择一条数据进行授权权");
					} else {
						var win = viewFactory.getWindow('jobSetGrayWindow', 'XTFrame.view.system.SetGrayWindow');
						this.initWindow(win, rows[0].data, "xtframe_job_optrole_0", 'jobGrayGray', "岗位授权权");
					}
				}
			},
			'systemSetGrayWindow[winId=jobSetGrayWindow] button[action=saveGray]': {
				click: function (button, e){
					var win = button.up('systemSetGrayWindow');
					if(win.flag=='jobGray' || win.flag=='jobGrayGray'){
						var sql1 = win.flag=='jobGray' ? "xtframe_job_role_1" : "xtframe_job_optrole_1";
						var sql2 = win.flag=='jobGray' ? "xtframe_job_role_2" : "xtframe_job_optrole_2";
						var grid = win.grid;
						var arrSqlValue = new Array(),
							roleData = new Array(),
							rows = grid.getSelectionModel().getSelection();
						arrSqlValue.push({sqlID:sql1, parameters:{jobid:win.jobid}});
						Ext.Array.each(rows, function(record){
							roleData.push({roleid: record.data.roleId});
							arrSqlValue.push({sqlID:sql2, parameters:{jobid:win.jobid, roleid:record.data.roleId}});
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
			'systemSetGrayWindow[winId=jobSetGrayWindow] button[action=resetGray]': {
				click: function (button, e){
					var win = button.up('systemSetGrayWindow');
					if(win.flag=='jobGray' || win.flag=='jobGrayGray'){
						this.setGridCheck(win.grid, win.roleData, 'roleId', 'roleid');
					}
				}
			}
		});
	},
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
		win.jobid = row.jobid;
		win.setTitle(row.jobname + "->" + title);
		win.show();
		win.grid.getStore().loadData(this.getOptRole());
		var data = ajaxUtil.executeQuery(sql, {jobid:row.jobid});
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
	gridEditSaveClick: function(grid, win, mark, opt){
		var panel = win.down('form');
		var form = panel.getForm();
		if(win.flag == 'add'){
			var serverData = ajaxUtil.serverData("regid","seq_jobid");
			if(ajaxUtil.isSucceed(serverData)){
				var jobid = serverData.data;
				var jobidpath = grid.jobidpath+jobid+".";
				var joblevel = pubOPT.getStrCount(jobidpath,".");
				form.findField("jobid").setValue(jobid);
				form.findField("jobidpath").setValue(jobidpath);
				form.findField("jobpid").setValue(grid.jobid);
				form.findField("joblevel").setValue(joblevel);
			} else {
				Ext.xtframe.msg("提示", "保存失败！");
				opt.flag = false;
			}
		}
	},
	refreshJob: function(tree){
		var data, jobData = ajaxUtil.executeQuery('xtframe_job_manage_1', {orgid:""});
		if(!ajaxUtil.isSucceed(jobData)){
			Ext.xtframe.msg("提示", "机构数据获取失败！");
		} else {
			data = pubOPT.treeNodeUnil(jobData.rows, undefined, 
				{menuId: 'jobid', menuName: 'jobname', menuLevel: 'joblevel', menuIdPath: 'jobidpath'});
			tree.getRootNode().removeAll(false);
			if(data.length > 0) {
				tree.getRootNode().appendChild(data);
				tree.expandAll();
			}
		}
	}
});