Ext.define("XTFrame.view.system.FileManager",{
	extend: 'Ext.grid.Panel',
	alias: 'widget.systemFileManager',
	region: 'center',
	frame: true,
	autoScroll: true,
	enableKeyNav: true,
	columns: [ Ext.create("Ext.grid.RowNumberer", {width:32}),
				{width: 220, text: '文件编码', dataIndex: 'fileid'}, 
				{width: 120, text: '用户编码', dataIndex: 'userid'}, 
				{width: 180, text: '文件名称', dataIndex: 'filename'}, 
				{width: 70, text: '文件类型', dataIndex: 'filetype'}, 
				{width: 100, text: '保存路径', dataIndex: 'filepath'}, 
				{width: 100, text: '文件大小(KB)', dataIndex: 'filesize',
					renderer: function(value){
						return Ext.Number.toFixed(value/1024, 1);
				}}, 
				{width: 70, text: '上传时间', dataIndex: 'savetime'} ],
	initComponent: function(){
		var me = this;
		Ext.create('XTFrame.store.File', {storeId: 's_file',
			listeners:{
				beforeload: function(store, options){
			        var new_params = {
						iFunc: ajaxUtil.FUNC_PAGING,
						strData: Ext.JSON.encode({totalSqlValue: ["xtframe_file_manage_0", me.filename],
							querySqlValue: ["xtframe_file_manage_1", options.start, options.limit, me.filename]})
					};
					var new_params = {
						iFunc: ajaxUtil.FUNC_PAGING,
						strData: Ext.JSON.encode({totalSqlObject: {sqlID: "xtframe_file_manage_0", parameters: {filename: me.filename}},
							querySqlObject: {sqlID: "xtframe_file_manage_1", parameters: {start: options.start, limit: options.limit, filename: me.filename}}})
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
			tbar: [ {xtype: 'button', text: '上传', action: 'uploadFile', iconCls: 'icon-upload',
						parentView: me, windowTitle: '文件上传', linkUrl: '/server/fileUpload.do'},
					{xtype: 'button', text: '下载', action: 'downloadFile', iconCls: 'icon-download'},
					{xtype: 'button', text: '删除', action: 'gridDelete', iconCls: 'icon-delete'},
					{xtype: 'button', text: '查询', action: 'gridSearch', iconCls: 'icon-search'} ],
			store: Ext.data.StoreManager.lookup('s_file'),
			selType: 'checkboxmodel',
			multiSelect: true,
			filename: '',
			searchWindow: 'XTFrame.view.system.FileSearchWindow',
			searchWinId: 'fileSearchWindow',
			deleteSql: 'xtframe_file_delete',
			deleteValues: ['fileid'],
			searchValues: ['filename'],
			dockedItems: [{
				xtype: 'pagingtoolbar',
				dock: 'bottom',
				displayInfo: true,
				store: Ext.data.StoreManager.lookup('s_file')
			}]
		});
		this.addEvents({'beforeupdate': true});
		this.callParent(arguments);
	}
});