Ext.define('XTFrame.view.system.DataBaseDragDropWindow', {
	extend: 'Ext.window.Window',
	requires: [ 'Ext.data.Store',
				'Ext.grid.Panel'],
	alias: 'widget.systemDataBaseDragDropWindow',
	title: '设置作用SQL',
	closeAction: 'hide',
	closable: true, 
	iconCls: 'edit-win',
	modal: true, 
	plain: true,
	resizable: false,
	layout: 'border',
	width: 810,
	height: 400,
	initComponent:function(){
		var store1 = Ext.create('Ext.data.Store', {
			fields: ['sqlid', 'sqlname'],
		    data : []
		});
		this.searchKey1 = Ext.create('Ext.form.field.Text',{fieldLabel: 'SQL编号',labelWidth: 60});
		this.gridWest = Ext.create('Ext.grid.Panel', {
			width: 400,
			region: 'west',
			multiSelect: true,
			columns: [ {width: 180, text: 'SQL编号', dataIndex: 'sqlid'},
						{width: 180, text: 'SQL名称', dataIndex: 'sqlname'} ],
			store: store1,
			searchKey: this.searchKey1,
			viewConfig: {
				plugins: [
					Ext.create('Ext.grid.plugin.DragDrop', {
						ddGroup: 'databaseDD',
						dragGroup: this.gridWest,
						dropGroup: this.gridWest,
						enableDrag: true,
						enableDrop: true
					})
				]
			},
			tbar: [ this.searchKey1,
					{xtype: 'button', text: '查询', action: 'sqlSearch', iconCls: 'icon-search'} ]
		});
		var store2 = Ext.create('Ext.data.Store', {
			fields: ['sqlid', 'sqlname'],
		    data : []
		});
		this.searchKey2 = Ext.create('Ext.form.field.Text',{fieldLabel: 'SQL编号',labelWidth: 60});
		this.gridCenter = Ext.create('Ext.grid.Panel', {
			region: 'center',
			multiSelect: true,
			columns: [ {width: 180, text: 'SQL编号', dataIndex: 'sqlid'},
						{width: 180, text: 'SQL名称', dataIndex: 'sqlname'} ],
			store: store2,
			searchKey: this.searchKey2,
			viewConfig: {
				plugins: [
					Ext.create('Ext.grid.plugin.DragDrop', {
						ddGroup: 'databaseDD',
						dragGroup: this.gridCenter,
						dropGroup: this.gridCenter,
						enableDrag: true,
						enableDrop: true
					})
				]
			},
			tbar: [ this.searchKey2,
					{xtype: 'button', text: '查询', action: 'sqlSearch', iconCls: 'icon-search'},
					{xtype: 'tbfill'},
					{xtype: 'button', text: '保存', action: 'saveDataBaseSql', iconCls: 'icon-save'} ]
		});
		Ext.apply(this,{
			items: [this.gridWest, this.gridCenter]
		});
		this.callParent(arguments);
	}
});