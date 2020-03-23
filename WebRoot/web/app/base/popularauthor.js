BUI.use(['bui/layout','bui/grid','bui/data','bui/menu','bui/overlay','bui/form','bui/tooltip'],function (Layout,Grid,Data,Menu,Overlay,Form,Tooltip) {
	var Store = Data.Store,
		columns = [
		     {
				title : '序号',
				dataIndex : 'sortno',
				elCls : 'center',
				width: 40,
				renderer : function(value,record){
					if(value == '1'){
						return '<span class="badge badge-success">'+value+'</span>';
					}else if(value == '2'){
						return '<span class="badge badge-warning">'+value+'</span>';
					}else if(value == '3'){
						return '<span class="badge badge-info">'+value+'</span>';
					}else{
						return '<span class="badge">'+value+'</span>';
					}
				}
			},{
				title : '作者',
				dataIndex : 'author_name',
				elCls : 'center',
				width: 80,
			},{
				title : '代表作',
				dataIndex : 'magnum',
				elCls : 'left',
				width: 130
			},{
				title : '添加用户',
				dataIndex : 'username',
				elCls : 'left',
				width: 150,
				renderer : function(value,record){
					return ''+record.realname+'['+value+']';
				}
			},{
				title : '添加时间',
				dataIndex : 'add_time',
				elCls : 'center',
				width: 130,
			},{
				title : '推荐理由',
				dataIndex : 'remark',
				elCls : 'left',
				width: 150
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
								sqlID: "wx_popu_1",
								parameters: {goods_name:params.key},
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
						title : '畅销推荐列表',
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
						items : [{
							btnCls : 'button button-small',
							text : '<i class="icon-plus"></i>添加',
							handler : function() {
								var pgid = 'temp_custom_' + PubOPT.getPageTempIndex();
								PubOPT.openPage({
									id: pgid,
									title: '畅销推荐信息添加',
									href: contextPath + '/p100096.html?ppid=' + PubOPT.getCurrentPageId()
								});
							}
						}, {
							btnCls : 'button button-small',
							text : '<i class="icon-edit"></i>编辑',
							handler : function() {
								var list = grid.getSelection();
								if(list.length != 1) {
									BUI.Message.Show({
										msg : '请选择一条记录编辑',
										icon : 'info',
										buttons : [],
										autoHide : true,
										autoHideDelay : 1000
									});
									return;
								}
								
							    var model = list[0];
								var pgid = 'temp_custom_' + PubOPT.getPageTempIndex();
								PubOPT.openPage({
									id: pgid,
									title: '畅销推荐信息编辑',
									href: contextPath + '/p100096.html?ppid=' + PubOPT.getCurrentPageId() + '&code=' + model.tj_id 
								});
							}
						}, {
							btnCls : 'button button-small',
							text : '<i class="icon-remove"></i>删除',
							handler : function() {
								var list = grid.getSelection();
								if(list.length <= 0) {
									BUI.Message.Show({
										msg : '请选择要删除的记录',
										icon : 'info',
										buttons : [],
										autoHide : true,
										autoHideDelay : 1000
									});
									return;
								}
								BUI.Message.Show({
									title : '确认提示',
									msg : '确认删除选中的记录吗?',
									icon : 'question',
									buttons : [{
										text:'是',
										elCls : 'button button-primary',
										handler : function(){
											var list = grid.getSelection();
											var sqllist = [];
											for(var i=0; i<list.length; i++){
												sqllist.push({sqlID: "wx_popu_6", parameters: {tj_id:list[i].tj_id}});   
											}
											if(AjaxUtil.command.isSucceed(AjaxUtil.command.executeTransaction(sqllist))){
												BUI.Message.Alert('删除成功','success');
												store.load({start: 0, pageIndex: 0});
											} else {
												BUI.Message.Alert('删除失败','error');
											}
											store.load({start: 0, pageIndex: 0});
										}
									},{
										text:'否',
										elCls : 'button',
										handler : function(){
											this.close();
										}
									}]
								});
							}
						}, { xclass : 'bar-item-separator' }, {
			                 content: '&nbsp;作者名称&nbsp;<input name="key" id="key" type="text" style="border:1px solid #999;width:200px;"/>'
						}, {
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

