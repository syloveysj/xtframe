Ext.define("XTFrame.view.contact.UsersListGrid",{
	extend: 'Ext.grid.Panel',
	alias: 'widget.contactUsersListGrid',
	region: 'center',
	frame: false,
	autoScroll: true,
	enableKeyNav: true,
	columns: [ {xtype: 'templatecolumn', tpl: '{username}&nbsp;[{realname}]', width: 200, text: '用户'}, 
				{width: 100, text: '在线状态', dataIndex: 'userid', renderer: function(value) {
					var flag = false;
					Ext.Array.each(this.onlineusers, function(userid) {
						if(userid == value){
							flag = true;
							return false;
						}
					});
					return flag ? "[<font color='red'>在线</font>]" : "[离线]";
				}}],
	initComponent: function(){
		var me = this;
		Ext.create('XTFrame.store.contact.User', {storeId: 'contact_user',
			listeners:{
				beforeload: function(store, options){
					me.fireEvent('storebeforeload', me);
			        var new_params = {
						iFunc: ajaxUtil.FUNC_EXECUTEQUERY,
						strData: Ext.JSON.encode({sqlID: 'contact_getusers_1',
							arrValue: ["", me.atjobid]})
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
		this.searchKey = Ext.create('Ext.form.field.Text',{fieldLabel: '用户名',labelWidth: 46});
		Ext.apply(this,{
			store: Ext.data.StoreManager.lookup('contact_user'),
			onlineusers: null,
			atjobid: '',
			tbar: [ this.searchKey,
					{xtype: 'button', text: '查找', action: 'searchUser', iconCls: 'icon-search'},
					{xtype: 'tbfill'},
					{xtype: 'button', text: '联系', action: 'contactUser', iconCls: 'icon-userinfo'} ]
		});
		this.callParent(arguments);
	}
});