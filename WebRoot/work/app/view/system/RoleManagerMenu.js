Ext.define("XTFrame.view.system.RoleManagerMenu",{
	extend: 'Ext.tree.Panel',
	alias: 'widget.systemRoleManagerMenu',
	margins: '0 0 0 0',
	title: '菜单权限',
	border: true,
	enableDD: false,
	split: true,
	rootVisible: false,
	containerScroll: true,
	collapsible: false,
	autoScroll: false,
	viewConfig: {
		onCheckboxChange : function(e, t) {
			var item = e.getTarget(this.getItemSelector(), this.getTargetEl()), record;
			if (item) {
				record = this.getRecord(item);
				var check = !record.get('checked');
				record.set('checked', check);

				if (check) {
					record.bubble(function(parentNode) {
						parentNode.set('checked', true);
					});
					record.cascadeBy(function(node) {
						node.set('checked', true);
					});
				} else {
					record.cascadeBy(function(node) {
						node.set('checked', false);
					});
				}
			}
		}
	},
	initComponent: function(){
		this.roleText = Ext.create('Ext.toolbar.TextItem');
		Ext.apply(this, {
			roleid: '',
			bInit: false,
			menuRoleData: null,
			dockedItems: [{
				xtype: 'toolbar',
				dock: 'top',
				items: [{xtype: 'tbtext', text:"<img src='/work/resources/images/icons/fam/user_edit.png' border='0'>&nbsp;&nbsp;&nbsp;设置角色:"},
						this.roleText,
						{xtype: 'tbfill'},
						{xtype: 'button', text: '刷新', action: 'refreshMenu', iconCls: 'icon-refresh'},
						{xtype: 'button', text: '保存', action: 'saveRole', iconCls: 'icon-save'},
						{xtype: 'button', text: '重置', action: 'resetRole', iconCls: 'icon-reset'}]
            }]
		});
		this.callParent(arguments);
	}
});