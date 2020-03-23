BUI.use(['bui/layout','bui/grid','bui/data','bui/menu','bui/overlay','bui/form','bui/tooltip'],function (Layout,Grid,Data,Menu,Overlay,Form,Tooltip) {
	var Store = Data.Store,
		columns = [
		    {
				title : '建议',
				dataIndex :'advices_info',
				elCls : 'left',
				width: 400
			},{
				title : '添加时间',
				dataIndex : 'crtime',
				elCls : 'center',
				width: 130,
			}],
		params = {
			key: ''
		};
	
	//缓存静态数据
	var store = new Store({
		url : contextPath + '/server/ajax.do',  //设置加载数据的URL
		    autoLoad : false,    //创建Store时自动加载数据
		    root : 'query',
		    totalProperty : 'total',     //存放记录总数的字段名(results)
		    remoteSort: true,
		    pageSize: 10,
		    params : {
		    	start : 1
		    },
		    proxy : {
				method : 'post',
				dataType : 'json'
		    },
		  //初始化事件，快速注册事件
		    listeners:{
				'beforeload': function (data) {
					data.params.iFunc = AjaxUtil.command.FUNC_PAGING;
					data.params.strData = $.toJSON({
								sqlID: "wx_adviceslist_1",
								parameters: {key:params.key},
								offset: data.params.pageIndex*data.params.limit,
								maxsize: data.params.limit,
								fast : true
							});
				}
			}
		});
	
	//窗口试图控件，当窗口发生变化时，自适应宽高
	var control = new Layout.Viewport({
			elCls : 'ext-border-layout',
			children : [{
					xclass : 'grid', //Grid
					layout : {
						region : 'center',
						title : '建议列表',
						fit : 'both'
					},
					id : 'grid',
					forceFit: true,	// 列宽按百分比自适应
					columns : columns,
					store : store,
					height: '420',
					loadMask : true,
					plugins : [Grid.Plugins.CheckSelection, Grid.Plugins.RowNumber],
					tbar:{
						items : [{ xclass : 'bar-item-separator' }, {
			                 content: '&nbsp;建议内容：&nbsp;<input name="key" id="key" type="text" style="border:1px solid #999;width:200px;"/>'
						},
						{
							btnCls : 'button button-small',
							text : '<i class="icon-search"></i>搜索',
							handler: searchKey
						}]
					},
					bbar:{
						pagingBar:true
					}
				}],
			plugins : [Layout.Border]
		});
	
	control.render();
	store.load();
	grid = control.getChild('grid');//通过id获取

	 $("#key").keydown(function (e) {
			var curKey = e.which;
			if (curKey == 13) {
				searchKey();
			}
		});
	 
	 function searchKey(){
		 params.key = $('#key').val();
		 store.load({start: 0, pageIndex: 0});
	 }
	 
});

