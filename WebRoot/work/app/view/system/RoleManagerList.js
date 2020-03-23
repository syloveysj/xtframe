Ext.define("XTFrame.view.system.RoleManagerList",{
	extend: 'Ext.grid.Panel',
	alias: 'widget.systemRoleManagerList',
	region: 'west',
	width: 352,
	frame: true,
	autoScroll: true,
	enableKeyNav: true,
	columns: [ Ext.create("Ext.grid.RowNumberer", {width:32}),
				{width: 120, text: '角色编号', dataIndex: 'roleid', sortable: true, field:{
					xtype:'textfield',
					allowBlank:false
				}}, 
				{width: 100, text: '角色名称', dataIndex: 'rolename', field:{
					xtype:'textfield',
					allowBlank:false
				}},
				{width: 50, text: '序号', dataIndex: 'sortno', sortable: true, field:{
					xtype:'textfield',
					allowBlank:false
				}} ],
	tbar: [ {xtype: 'button', text: '添加', action: 'add', iconCls: 'icon-add'},
			{xtype: 'button', text: '删除', action: 'gridDelete', iconCls: 'icon-delete'},
			{xtype: 'button', text: '克隆', action: 'clone', iconCls: 'icon-clone'},
			{xtype: 'button', text: '设置', action: 'setting', iconCls: 'icon-editrole'},
			{xtype: 'button', text: '清理', action: 'clear', iconCls: 'icon-clear'},
			{xtype: 'button', text: '刷新', action: 'refresh', iconCls: 'icon-refresh'} ],
	initComponent:function(){
		var me = this;
		Ext.create('XTFrame.store.Role', {storeId: 's_role',
			listeners:{
				beforeload: function(store, options){
			        var new_params = {
						iFunc: ajaxUtil.FUNC_EXECUTEQUERY,
						strData: Ext.JSON.encode({sqlID: 'xtframe_role_manage_0', parameters: {}})
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
		this.rowEditing = Ext.create('Ext.grid.plugin.RowEditing',{
			clicksToEdit: 2,
			//override取消编辑方法，加入自己的业务逻辑（新建文件点击取消后rollback）
			//这里需要加入标志位，不让会导致无限循环错误，因为grid的load，store的remove都会导致cancelEdit
			//判断有米有new，使用phantom属性，boolean
			newSignal: 'normal',
			cancelEdit: function() {
				var me = this;
				if (me.editing) {
					me.getEditor().cancelEdit();
					store = Ext.data.StoreManager.lookup('s_role');
					var n = store.findBy(function(r){
						return (r.data.phantom==true);
					});
					if(me.newSignal == 'newing'){
						if(n!=-1){
							store.removeAt(n);
						}
						me.newSignal = 'normal';
					}
				}
			}
		});
		Ext.apply(this,{
			store: Ext.data.StoreManager.lookup('s_role'),
			selType: 'checkboxmodel',
			multiSelect: true,
			roleid: '',
			deleteSql: 'xtframe_role_manage_1',
			deleteValues: ['roleid'],
			plugins: [
				this.rowEditing
			]
		});
		this.callParent(arguments);
	}
});