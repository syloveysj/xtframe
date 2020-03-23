Ext.define("XTFrame.view.system.UserManager",{
	extend: 'Ext.grid.Panel',
	alias: 'widget.systemUserManager',
	region: 'center',
	frame: true,
	autoScroll: true,
	enableKeyNav: true,
	columns: [ Ext.create("Ext.grid.RowNumberer", {width:32}),
				{width: 160, text: '账号', dataIndex: 'username', sortable: true}, 
				{width: 160, text: '姓名', dataIndex: 'realname'}, 
				{width: 160, text: '所属机构', dataIndex: 'orgname'}, 
				{width: 160, text: '所属岗位', dataIndex: 'jobname'}, 
				{width: 120, text: '在线状态', dataIndex: 'userid', renderer: function(value) {
					var flag = false;
					Ext.Array.each(this.onlineusers, function(userid) {
						if(userid == value){
							flag = true;
							return false;
						}
					});
					return flag ? "[<font color='red'>在线</font>]" : "[离线]";
				}}, 
				{width: 60, text: '序号', dataIndex: 'sortno', sortable: true} ],
	tbar: [ {xtype: 'button', text: '添加', action: 'gridAdd', iconCls: 'icon-add'},
			{xtype: 'button', text: '删除', action: 'gridDelete', iconCls: 'icon-delete'},
			{xtype: 'button', text: '修改', action: 'gridEdit', iconCls: 'icon-edit'},
			{xtype: 'button', text: '查询', action: 'gridSearch', iconCls: 'icon-search'},
			{xtype: 'button', text: '授权', action: 'userGray', iconCls: 'icon-usergray'},
			{xtype: 'button', text: '授权权', action: 'userGrayGray', iconCls: 'icon-usergraygray'} ],
	initComponent:function(){
		var me = this;
		Ext.create('XTFrame.store.User', {storeId: 's_user',
			listeners:{
				beforeload: function(store, options){
					me.fireEvent('storebeforeload', me);
					var new_params = {
						iFunc: ajaxUtil.FUNC_PAGING,
						strData: Ext.JSON.encode({sqlID: "xtframe_user_manage_1", parameters: {userid: me.userid, username: me.username, orgname: me.orgname, jobname:me.jobname}, offset: options.start, maxsize: options.limit})
					};
			        Ext.apply(store.proxy.extraParams, new_params);
			    },
			    load: function(store, records, successful){
			    	if(successful){
			    		ajaxUtil.isLogin(store.proxy.reader.jsonData);
			    	}
			    }
			}
		});
		Ext.apply(this,{
			store: Ext.data.StoreManager.lookup('s_user'),
			selType: 'checkboxmodel',
			multiSelect: true,
			onlineusers: null,
			userid: '',
			username: '',
			orgname: '',
			jobname: '',
			editWindow: 'XTFrame.view.system.UserEditWindow',
			editWinId: 'userEditWindow',
			searchWindow: 'XTFrame.view.system.UserSearchWindow',
			searchWinId: 'userSearchWindow',
			addSql: 'xtframe_user_manage_3',
			addValues: ['userid', 'pwd', 'username', 'realname', 'sex', 'birthday', 'idcard',
						'photo', 'address', 'tel', 'mobile', 'email', 'remark', 'orgid', 'jobid', 'sortno', 'state'],
			editSql: 'xtframe_user_manage_4',
			editValues: ['userid', 'pwd', 'username', 'realname', 'sex', 'birthday', 'idcard',
						'photo', 'address', 'tel', 'mobile', 'email', 'remark', 'orgid', 'jobid', 'sortno', 'state'],
			deleteSql: 'xtframe_user_manage_2',
			deleteValues: ['userid'],
			searchValues: ['userid', 'username', 'orgname', 'jobname'],
			dockedItems: [{
				xtype: 'pagingtoolbar',
				dock: 'bottom',
				displayInfo: true,
				store: Ext.data.StoreManager.lookup('s_user')
			}]
		});
		this.addEvents({'beforeupdate': true});
		this.addEvents({'storeload': true});
		this.callParent(arguments);
	}
});