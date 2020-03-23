Ext.define('XTFrame.controller.contact.UsersListWindow', {
	extend: 'Ext.app.Controller',
	init: function(){
		this.control({
			'contactUsersListSearch': {
				initcomplete: function(tree){
					this.refreshJob(tree);
				},
				itemclick: function(tree, record, item, index, e){
					var layout = tree.up('contactUsersListWindow');
					var grid = layout.down('contactUsersListGrid');
					grid.atjobid = record.raw ? record.raw.atjobid : record.data.atjobid;
					grid.getStore().load();
				}
			},
			'contactUsersListWindow contactUsersListSearch tool[type=refresh]': {
				click: function (o, e){
					this.refreshJob(o.up('contactUsersListSearch'));
				}
			},
			'contactUsersListWindow contactUsersListGrid': {
				storebeforeload: function(grid){
					var onlineusers, serverData = ajaxUtil.serverData("useronlinecode");
					if(ajaxUtil.isSucceed(serverData)) onlineusers = serverData.retData;
					else onlineusers = [];
					grid.onlineusers = onlineusers;
				},
				itemdblclick: function(grid, record, item, index, e){
					this.showUserInfo(grid, record);
				}
			},
			'contactUsersListWindow contactUsersListGrid button[action=searchUser]': {
				click: function (button, e){
				}
			},
			'contactUsersListWindow contactUsersListGrid button[action=contactUser]': {
				click: function (button, e){
					var grid = button.up('contactUsersListGrid');
					var records = grid.getSelectionModel().getSelection();
					if(records.length != 1){
						Ext.xtframe.msg("提示", "请您选择一个用户进行联系");
						return;
					}
					this.showUserInfo(grid, records[0]);
				}
			},
			'contactUsersListWindow contactUserContactPanel tool[type=left]': {
				click: function (o, e){
					var ucp = o.up('contactUserContactPanel');
					var ulw = ucp.up('contactUsersListWindow');
					if(!ucp.hidden){
						ucp.hide();
						ulw.setWidth(ulw.getWidth()-ucp.width);
					}
				}
			}
		});
	},
	refreshJob: function (tree){
		var data, jobData = ajaxUtil.executeQuery('xtframe_job_manage_0', {organid:""});
		if(!ajaxUtil.isSucceed(jobData)){
			Ext.xtframe.msg("提示", "机构数据获取失败！");
		} else {
			data = pubOPT.treeNodeUnil(jobData.arrData, undefined, 
				{menuId: 'jobid', menuName: 'jobname', menuLevel: 'joblevel', atMenuId: 'atjobid'});
			data.push({id:0, text:'其他', leaf: true, atjobid:0});
			tree.getRootNode().removeAll(true);
			tree.getRootNode().appendChild(data);
			tree.expandAll();
		}
	},
	showUserInfo: function (grid, record){
		var ulw = grid.up('contactUsersListWindow');
		var ucp = ulw.down('contactUserContactPanel');
		if(ucp.hidden){
			ulw.setWidth(ulw.getWidth()+ucp.width);
			ucp.show();
		}
		ucp.userid = record.data.userid;
		if(!Ext.isEmpty(record.data.photo)) ucp.down("image[name=showPhoto]").setSrc(record.data.photo);
		else ucp.down("image[name=showPhoto]").setSrc("/images/icons/defaultphoto.png");
		ucp.down("label[name=userName]").setText('用户名：'+record.data.username, false);
		ucp.down("label[name=realName]").setText('真实名：'+record.data.realname, false);
	}
});