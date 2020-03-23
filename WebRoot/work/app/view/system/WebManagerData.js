Ext.define("XTFrame.view.system.WebManagerData",{
	extend: 'Ext.grid.Panel',
	alias: 'widget.systemWebManagerData',
	region: 'center',
	frame: true,
	autoScroll: true,
	enableKeyNav: true,//按键操作
	columns: [ Ext.create("Ext.grid.RowNumberer", {width:32}),
				{width: 120, text: '数据名称', dataIndex: 'dataname'},  
				{width: 120, text: '执行类型', dataIndex: 'exectype', renderer: function(value) {
					var ret = "";
					switch(value){
						case 'single_sql':
							ret = "单条SQL"; break;
						case 'transaction':
							ret = "事务处理"; break;
						case 'final':
							ret = "常量"; break;
						case 'custom':
							ret = "自定义"; break;
					}
					return ret;
				}},
				{width: 80, text: '执行顺序', dataIndex: 'execsortno', sortable: true}, 
				{width: 140, text: '备注', dataIndex: 'remark'} ],
	initComponent:function(){
		var me = this;
		Ext.create('XTFrame.store.WebData', {storeId: 's_webdata',
			listeners:{
				beforeload: function(store, options){
					var new_params = {
						iFunc: ajaxUtil.FUNC_PAGING,
						strData: Ext.JSON.encode({sqlID: "xtframe_web_manage_2", parameters: {pageid: me.pageid}, offset: options.start, maxsize: options.limit})
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
		
		this.pageText = Ext.create('Ext.toolbar.TextItem');
		Ext.apply(this,{
			tbar: [ {xtype: 'button', text: '添加', action: 'gridAdd', iconCls: 'icon-add'},
					{xtype: 'button', text: '删除', action: 'gridDelete', iconCls: 'icon-delete'},
					{xtype: 'button', text: '修改', action: 'gridEdit', iconCls: 'icon-edit'},
					{xtype: 'tbtext', text:"&nbsp;&nbsp;&nbsp;<font color='red'>当前页面:</font>"},
					this.pageText ],
			store: Ext.data.StoreManager.lookup('s_webdata'),
			selType: 'checkboxmodel',
			multiSelect: true,
			pageid: '',
			editWindow: 'XTFrame.view.system.WebDataEditWindow',
			editWinId: 'webDataEditWindow',
			addSql: 'xtframe_web_manage_3',
			addValues: ['defid', 'pageid', 'dataname', 'exectype', 'execsortno', 'remark'],
			editSql: 'xtframe_web_manage_4',
			editValues: ['defid', 'dataname', 'exectype', 'execsortno', 'remark'],
			deleteSql: 'xtframe_web_manage_5',
			deleteValues: ['defid'],
			dockedItems: [{
				xtype: 'pagingtoolbar',
				dock: 'bottom',
				displayInfo: true,
				store: Ext.data.StoreManager.lookup('s_webdata')
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