Ext.define("XTFrame.view.system.WebManagerDetails",{
	extend: 'Ext.grid.Panel',
	alias: 'widget.systemWebManagerDetails',
	region: 'east',
	width: 360,
	frame: true,
	autoScroll: true,
	enableKeyNav: true,//按键操作
	columns: [ Ext.create("Ext.grid.RowNumberer", {width:32}),
				{width: 160, text: '执行内容', dataIndex: 'execcontent'},  
				{width: 80, text: '执行顺序', dataIndex: 'execsortno', sortable: true} ],
	initComponent:function(){
		var me = this;
		Ext.create('XTFrame.store.WebDataDetails', {storeId: 's_webdatadetails',
			listeners:{
				beforeload: function(store, options){
					var new_params = {
						iFunc: ajaxUtil.FUNC_PAGING,
						strData: Ext.JSON.encode({sqlID: "xtframe_web_manage_6", parameters: {defid: me.defid}, offset: options.start, maxsize: options.limit})
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
		
		this.dataText = Ext.create('Ext.toolbar.TextItem');
		Ext.apply(this,{
			tbar: [ {xtype: 'button', text: '添加', action: 'gridAdd', iconCls: 'icon-add'},
					{xtype: 'button', text: '删除', action: 'gridDelete', iconCls: 'icon-delete'},
					{xtype: 'button', text: '修改', action: 'gridEdit', iconCls: 'icon-edit'},
					{xtype: 'tbtext', text:"&nbsp;&nbsp;&nbsp;<font color='red'>当前页面:</font>"},
					this.dataText ],
			store: Ext.data.StoreManager.lookup('s_webdatadetails'),
			selType: 'checkboxmodel',
			multiSelect: true,
			defid: '',
			editWindow: 'XTFrame.view.system.WebDataDetailsEditWindow',
			editWinId: 'webDataDetailsEditWindow',
			addSql: 'xtframe_web_manage_7',
			addValues: ['detid', 'defid', 'execcontent', 'execsortno'],
			editSql: 'xtframe_web_manage_8',
			editValues: ['detid', 'execcontent', 'execsortno'],
			deleteSql: 'xtframe_web_manage_9',
			deleteValues: ['detid'],
			dockedItems: [{
				xtype: 'pagingtoolbar',
				dock: 'bottom',
				displayInfo: true,
				store: Ext.data.StoreManager.lookup('s_webdatadetails')
			}],
			listeners: {	//解决滚动条卡住问题
				scrollershow: function(scroller) {
					if (scroller && scroller.scrollEl) {
						scroller.clearManagedListeners();
						scroller.mon(scroller.scrollEl, 'scroll', scroller.onElScroll, scroller);
					}
				}
			}
		});
		this.callParent(arguments);
	}
});