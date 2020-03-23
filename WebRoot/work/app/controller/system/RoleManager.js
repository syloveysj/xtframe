Ext.define('XTFrame.controller.system.RoleManager', {
	extend: 'Ext.app.Controller',
	init: function(){
		this.control({
			'systemRoleManagerList': {
				edit: function(editor, e){
					var row = e.record.data;
					var sqlID = e.record.phantom==true ? "xtframe_role_manage_2" : "xtframe_role_manage_3";
					var arrValue = {roleid:row.roleid, rolename:row.rolename, sortno:row.sortno};
					var data = ajaxUtil.executeUpdate(sqlID, arrValue);
					if(ajaxUtil.isSucceed(data)){
						delete e.record.phantom;
						e.record.commit();
						// 克隆角色权限
						if ("cloneRoleId" in row){
							var arrSqlValue = [{sqlID:"xtframe_role_menu_clone", parameters:{cloneroleid:row.cloneRoleId, roleid:row.roleid}},
								{sqlID:"xtframe_role_sql_clone", parameters:{cloneroleid:row.cloneRoleId, roleid:row.roleid}},
								{sqlID:"xtframe_role_logic_clone", parameters:{cloneroleid:row.cloneRoleId, roleid:row.roleid}},
								{sqlID:"xtframe_role_res_clone", parameters:{cloneroleid:row.cloneRoleId, roleid:row.roleid}}];
							var result = ajaxUtil.executeTransaction(arrSqlValue);
							if(ajaxUtil.isSucceed(result)){
								delete row.cloneRoleId;
							} else {
								Ext.xtframe.msg("提示", "权限克隆失败！");
							}
						}
					} else {
						Ext.xtframe.msg("提示", "保存失败！");
						var rowEditing = editor.grid.rowEditing;
						rowEditing.startEdit(editor.grid.getStore().getAt(editor.rowIdx), this.getRoelIdColumn(editor.grid.columns));
					}
				},
				beforeedit: function(editor, context, eOpts){
//					console.log(editor);
//					debugger;
					if(editor.rowIdx > 0){
						var store = editor.grid.getStore();
						while(true){
							var n = store.findBy(function(r){
								return (r.data.phantom==true);
							});
							if(n!=-1) store.removeAt(n);
							else break;
						}
					}
					var field = this.getRoelIdColumn(editor.grid.columns).field;
					if(context.record.phantom == true){
						field.setReadOnly(false);
					} else {
						field.setReadOnly(true);
					}
				}
			},
			'systemRoleManagerTab': {
				tabchange: function (tabPanel, newCard, oldCard){
					var layout = tabPanel.up('panelBorder');
					var grid = layout.down('systemRoleManagerList');
					var rmu = tabPanel.down('systemRoleManagerUser');
					var rmm = tabPanel.down('systemRoleManagerMenu');
					var rmsql = tabPanel.down('systemRoleManagerSQL');
					var rml = tabPanel.down('systemRoleManagerLogic');
					var rmr = tabPanel.down('systemRoleManagerRes');
					var roleid = grid.roleid;
					
					if(newCard.bInit == false){
						newCard.bInit = true;
						if(newCard == rmm){
							this.initMenuData(rmm);
						} else if(newCard == rmsql){
							rmsql.getStore().load();
						} else if(newCard == rml){
							rml.getStore().load();
						} else if(newCard == rmr){
							rmr.getStore().load();
						}
					}
					if(roleid=="" || newCard.roleid==roleid) return ;
					this.setNewCardRole(newCard, roleid, rmu, rmm, rmsql, rml, rmr);
				}
			},
			'systemRoleManagerList button[action=add]': {
				click: function(button, e){
					var grid = button.up('systemRoleManagerList');
					var store = grid.getStore();
					var rowEditing = grid.rowEditing;
					var model = store.model;
					var roleObj = new model({
						roleid: "new Role",
						rolename: "新角色",
						sortno: "99",
						phantom: true
					});
					rowEditing.cancelEdit();
					store.insert(0, roleObj);
					rowEditing.startEdit(store.first(), this.getRoelIdColumn(grid.columns));
					rowEditing.newSignal = 'newing';
				}
			},
			'systemRoleManagerList button[action=clone]': {
				click: function(button, e){
					var grid = button.up('systemRoleManagerList');
					var rows = grid.getSelectionModel().getSelection();
					if(rows.length != 1){
						Ext.xtframe.msg("提示", "请您选择一个角色克隆！");
					} else {
						var role = rows[0].data;
						var store = grid.getStore();
						var rowEditing = grid.rowEditing;
						var model = store.model;
						var roleObj = new model({
							roleid: "clone "+role.roleid,
							rolename: "克隆 "+role.rolename,
							sortno: "99",
							phantom: true,
							cloneRoleId: role.roleid
						});
						rowEditing.cancelEdit();
						store.insert(0, roleObj);
						rowEditing.startEdit(store.first(), this.getRoelIdColumn(grid.columns));
						rowEditing.newSignal = 'newing';
					}
				}
			},
			'systemRoleManagerList button[action=setting]': {
				click: function(button, e){
					var grid = button.up('systemRoleManagerList');
					var rows = grid.getSelectionModel().getSelection();
					if(rows.length != 1){
						Ext.xtframe.msg("提示", "请您选择一个角色进行设置！");
					} else {
						var roleid = rows[0].data.roleid;
						grid.roleid = roleid;
						var layout = button.up('panelBorder');
						var rmu = layout.down('systemRoleManagerUser');
						var rmm = layout.down('systemRoleManagerMenu');
						var rmsql = layout.down('systemRoleManagerSQL');
						var rml = layout.down('systemRoleManagerLogic');
						var rmr = layout.down('systemRoleManagerRes');
						
						var rmt = layout.down('systemRoleManagerTab');
						var newCard = rmt.getActiveTab();
						this.setNewCardRole(newCard, roleid, rmu, rmm, rmsql, rml, rmr);
					}
				}
			},
			'systemRoleManagerList button[action=clear]': {
				click: function(button, e){
					var data = ajaxUtil.executeTransaction([{sqlID:"xtframe_job_role_clear"},
						{sqlID:"xtframe_user_role_clear"},
						{sqlID:"xtframe_role_menu_clear"},
						{sqlID:"xtframe_role_sql_clear"},
						{sqlID:"xtframe_role_logic_clear"},
						{sqlID:"xtframe_role_res_clear"}]);
					if(ajaxUtil.isSucceed(data)){
						var info = "角色垃圾清理成功！<br/>";
						info += "job_role清理["+data.rows[0]+"]条记录<br/>";
						info += "user_role清理["+data.rows[1]+"]条记录<br/>";
						info += "role_menu清理["+data.rows[2]+"]条记录<br/>";
						info += "role_sql清理["+data.rows[3]+"]条记录<br/>";
						info += "role_logic清理["+data.rows[4]+"]条记录<br/>";
						info += "role_res清理["+data.rows[5]+"]条记录";
						Ext.Msg.alert("提示", info);
					} else {
						Ext.xtframe.msg("提示", "清理失败！");
					}
				}
			},
			'systemRoleManagerList button[action=refresh]': {
				click: function(button, e){
					var grid = button.up('systemRoleManagerList');
					grid.getStore().load();
				}
			},
			'systemRoleManagerMenu button[action=refreshMenu]': {
				click: function(button, e){
					var menu = button.up('systemRoleManagerMenu');
					this.initMenuData(menu);
					this.setNodeCheck(menu, menu.menuRoleData);
				}
			},
			'systemRoleManagerMenu button[action=saveRole]': {
				click: function(button, e){
					// 菜单权限保存
					var menu = button.up('systemRoleManagerMenu');
					if(menu.roleid == "") return;
					var arrSqlValue = new Array();
					arrSqlValue.push({sqlID:"xtframe_role_menu_1", parameters:{roleid:menu.roleid}});
					var nodes = menu.getChecked(),
						menuid,
						menuRoleData = new Array();
					Ext.Array.each(nodes, function(node) {
						menuid = node.raw ? node.raw.menuid : node.data.menuid;
						if(!menuid || menuid<1) return true;
						menuRoleData.push({menuid: menuid});
						arrSqlValue.push({sqlID:"xtframe_role_menu_2", parameters:{roleid:menu.roleid, menuid:menuid}});
					});
//					console.log(menuRoleData);
//					console.log(arrSqlValue);
					var data = ajaxUtil.executeTransaction(arrSqlValue);
					if(ajaxUtil.isSucceed(data)){
						menu.menuRoleData = menuRoleData;
						Ext.xtframe.msg("提示", "菜单权限保存成功！");
					} else {
						Ext.xtframe.msg("提示", "菜单权限保存失败！");
					}
				}
			},
			'systemRoleManagerMenu button[action=resetRole]': {
				click: function(button, e){
					var menu = button.up('systemRoleManagerMenu');
					this.setNodeCheck(menu, menu.menuRoleData);
				}
			},
			'systemRoleManagerSQL button[action=saveRole]': {
				click: function(button, e){
					// SQL权限保存
					var grid = button.up('systemRoleManagerSQL');
					if(grid.roleid == "") return;
					this.gridMemory(grid, grid.roleDataNew, 'sqlid');
					
					var arrSqlValue = new Array();
					arrSqlValue.push({sqlID:"xtframe_role_sql_1", parameters:{roleid:grid.roleid}});
					Ext.Array.each(grid.roleDataNew, function(data) {
						arrSqlValue.push({sqlID:"xtframe_role_sql_2", parameters:{roleid:grid.roleid, sqlid:data.sqlid}});
					});
//					console.log(arrSqlValue);
					var data = ajaxUtil.executeTransaction(arrSqlValue);
					if(ajaxUtil.isSucceed(data)){
						grid.roleData = pubOPT.objClone(grid.roleDataNew, Array);
						Ext.xtframe.msg("提示", "SQL权限保存成功！");
					} else {
						Ext.xtframe.msg("提示", "SQL权限保存失败！");
					}
				}
			},
			'systemRoleManagerSQL button[action=resetRole]': {
				click: function(button, e){
					var grid = button.up('systemRoleManagerSQL');
					grid.roleDataNew = pubOPT.objClone(grid.roleData, Array);
					this.setGridCheck(grid, grid.roleData, 'sqlid');
				}
			},
			'systemRoleManagerSQL pagingtoolbar': {
				beforechange: function(ptbar, page){
					var rmsql = ptbar.up('systemRoleManagerSQL');
					if(rmsql.roleid == "") return;
					this.gridMemory(rmsql, rmsql.roleDataNew, 'sqlid');
				},
				change: function(ptbar, pageData){
					var rmsql = ptbar.up('systemRoleManagerSQL');
					if(rmsql.roleid == "") return;
					this.setGridCheck(rmsql, rmsql.roleDataNew, 'sqlid');
				}
			},
			'systemRoleManagerLogic button[action=saveRole]': {
				click: function(button, e){
					// 逻辑权限保存
					var grid = button.up('systemRoleManagerLogic');
					if(grid.roleid == "") return;
					this.gridMemory(grid, grid.roleDataNew, 'logicid');
					
					var arrSqlValue = new Array();
					arrSqlValue.push({sqlID:"xtframe_role_logic_1", parameters:{roleid:grid.roleid}});
					Ext.Array.each(grid.roleDataNew, function(data) {
						arrSqlValue.push({sqlID:"xtframe_role_logic_2", parameters:{roleid:grid.roleid, logicid:data.logicid}});
					});
//					console.log(arrSqlValue);
					var data = ajaxUtil.executeTransaction(arrSqlValue);
					if(ajaxUtil.isSucceed(data)){
						grid.roleData = pubOPT.objClone(grid.roleDataNew, Array);
						Ext.xtframe.msg("提示", "逻辑权限保存成功！");
					} else {
						Ext.xtframe.msg("提示", "逻辑权限保存失败！");
					}
				}
			},
			'systemRoleManagerLogic button[action=resetRole]': {
				click: function(button, e){
					var grid = button.up('systemRoleManagerLogic');
					grid.roleDataNew = pubOPT.objClone(grid.roleData, Array);
					this.setGridCheck(grid, grid.roleData, 'logicid');
				}
			},
			'systemRoleManagerLogic pagingtoolbar': {
				beforechange: function(ptbar, page){
					var rml = ptbar.up('systemRoleManagerLogic');
					if(rml.roleid == "") return;
					this.gridMemory(rml, rml.roleDataNew, 'logicid');
				},
				change: function(ptbar, pageData){
					var rml = ptbar.up('systemRoleManagerLogic');
					if(rml.roleid == "") return;
					this.setGridCheck(rml, rml.roleDataNew, 'logicid');
				}
			},
			'systemRoleManagerRes button[action=saveRole]': {
				click: function(button, e){
					// 资源权限保存
					var grid = button.up('systemRoleManagerRes');
					if(grid.roleid == "") return;
					this.gridMemory(grid, grid.roleDataNew, 'resid');
					
					var arrSqlValue = new Array();
					arrSqlValue.push({sqlID:"xtframe_role_res_1", parameters:{roleid:grid.roleid}});
					Ext.Array.each(grid.roleDataNew, function(data) {
						arrSqlValue.push({sqlID:"xtframe_role_res_2", parameters:{roleid:grid.roleid, resid:data.resid}});
					});
					var data = ajaxUtil.executeTransaction(arrSqlValue);
					if(ajaxUtil.isSucceed(data)){
						grid.roleData = pubOPT.objClone(grid.roleDataNew, Array);
						Ext.xtframe.msg("提示", "资源权限保存成功！");
					} else {
						Ext.xtframe.msg("提示", "资源权限保存失败！");
					}
				}
			},
			'systemRoleManagerRes button[action=resetRole]': {
				click: function(button, e){
					var grid = button.up('systemRoleManagerRes');
					grid.roleDataNew = pubOPT.objClone(grid.roleData, Array);
					this.setGridCheck(grid, grid.roleData, 'resid');
				}
			},
			'systemRoleManagerRes pagingtoolbar': {
				beforechange: function(ptbar, page){
					var rml = ptbar.up('systemRoleManagerRes');
					if(rml.roleid == "") return;
					this.gridMemory(rml, rml.roleDataNew, 'resid');
				},
				change: function(ptbar, pageData){
					var rml = ptbar.up('systemRoleManagerRes');
					if(rml.roleid == "") return;
					this.setGridCheck(rml, rml.roleDataNew, 'resid');
				}
			}
		});
	},
	initMenuData: function(menu){
		var data, menuData = ajaxUtil.executeQuery('xtframe_menu_manage_1', {});
		if(!ajaxUtil.isSucceed(menuData)){
			Ext.xtframe.msg("提示", "菜单数据获取失败");
		} else {
			data = pubOPT.treeNodeUnil(menuData.rows, undefined, 
				{menuId: 'menuid', menuName: 'menuname', menuLevel: 'menulevel', menuIdPath: 'menuidpath', iconCls: 'menuicon'}, false);
			menu.getRootNode().removeAll(false);
			if(data.length > 0) {
				menu.getRootNode().appendChild(data);
				menu.expandAll();
			}
		}
	},
	setNewCardRole: function(newCard, roleid, rmu, rmm, rmsql, rml, rmr){
		newCard.roleText.setText(roleid);
		newCard.roleid = roleid;
		var data;
		if(newCard == rmu){
			rmu.getStore().load();
		} else if(newCard == rmm){
			data = ajaxUtil.executeQuery("xtframe_role_menu_0",{roleid:roleid});
			if(ajaxUtil.isSucceed(data)){
				rmm.menuRoleData = data.rows;
				this.setNodeCheck(rmm, data.rows);
			} else {
				Ext.xtframe.msg("提示", "菜单权限加载失败！");
			}
		} else if(newCard == rmsql){
			data = ajaxUtil.executeQuery("xtframe_role_sql_0",{roleid:roleid});
			if(ajaxUtil.isSucceed(data)){
				rmsql.roleData = data.rows;
				rmsql.roleDataNew = pubOPT.objClone(data.rows, Array);
				this.setGridCheck(rmsql, data.rows, 'sqlid');
			} else {
				Ext.xtframe.msg("提示", "SQL权限加载失败！");
			}
		} else if(newCard == rml){
			data = ajaxUtil.executeQuery("xtframe_role_logic_0",{roleid:roleid});
			if(ajaxUtil.isSucceed(data)){
				rml.roleData = data.rows;
				rml.roleDataNew = pubOPT.objClone(data.rows, Array);
				this.setGridCheck(rml, data.rows, 'logicid');
			} else {
				Ext.xtframe.msg("提示", "逻辑权限加载失败！");
			}
		} else if(newCard == rmr){
			data = ajaxUtil.executeQuery("xtframe_role_res_0",{roleid:roleid});
			if(ajaxUtil.isSucceed(data)){
				rmr.roleData = data.rows;
				rmr.roleDataNew = pubOPT.objClone(data.rows, Array);
				this.setGridCheck(rmr, data.rows, 'resid');
			} else {
				Ext.xtframe.msg("提示", "资源权限加载失败！");
			}
		}
	},
	clearNodeCheck: function(menu){
		var nodes = menu.getChecked();
		Ext.Array.each(nodes, function(node) {
			node.set('checked', false);
		});
	},
	setNodeCheck: function(menu, ls){
		this.clearNodeCheck(menu);
		if(Ext.isEmpty(ls)) return;
		menu.expandAll();
		var tree = menu.getStore();
		Ext.Array.each(ls, function(data) {
			var node = tree.getNodeById(data.menuid);
			if(node) node.set('checked', true);
		});
	},
	clearGridCheck: function(grid){
		var model = grid.getSelectionModel();
		model.deselect(model.getSelection());
	},
	setGridCheck: function(grid, ls, key){
		this.clearGridCheck(grid);
		if(Ext.isEmpty(ls)) return;
		var model = grid.getSelectionModel();
		var store = grid.getStore();
		store.each(function(record){
			Ext.Array.each(ls, function(data) {
				if(data[key] == record.data[key]){
					model.selectRange(record, record, true);
					return false;
				}
			});
		});
	},
	gridMemory: function(grid, ls, key){
		var store = grid.getStore();
		store.each(function(record){
			Ext.Array.each(ls, function(data) {
				if(data[key] == record.data[key]){
					Ext.Array.remove(ls, data);
					return false;
				}
			});
		});
		var rows = grid.getSelectionModel().getSelection();
		Ext.Array.each(rows, function(record){
			var o = new Object();
			o[key] = record.data[key];
			ls.push(o);
		});
	},
	getRoelIdColumn: function (columns){
		var result;
		Ext.Array.each(columns, function(column) {
	        if(column.dataIndex == 'roleid'){
	        	result = column;
	        	return column;
	        }
	    });
	    return result;
	}
});