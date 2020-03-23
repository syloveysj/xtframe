BUI.use(['bui/layout','bui/grid','bui/data','bui/menu','bui/overlay','bui/form','bui/tooltip'],function (Layout,Grid,Data,Menu,Overlay,Form,Tooltip) {
	var Store = Data.Store,
		columns = [
		    {
				title : '位置',
				dataIndex :'position',
				elCls : 'center',
				width: 60,
				renderer:function(value,record){
					if(value == '0'){
						return '<span class="badge badge-info">Top</span>';
					}else if(value == '1'){
						return '<span class="badge badge-success">Bottom</span>';
					}else{
						return '<span class="badge">未知</span>';
					}
				}
			},{
				title : '活动名称',
				dataIndex :'activity_name',
				elCls : 'left',
				width: 180
			},{
				title : '活动链接',
				dataIndex :'activity_url',
				elCls : 'left',
				width: 180
			},{
				title : '开始时间',
				dataIndex :'activity_qtime',
				elCls : 'left',
				width: 125
			},{
				title : '结束时间',
				dataIndex :'activity_stime',
				elCls : 'left',
				width: 125
			},{
				title : '添加时间',
				dataIndex : 'add_time',
				elCls : 'center',
				width: 125
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
								sqlID: "wx_activity_1",
								parameters: {orders_id:params.key},
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
						title : '配送信息列表',
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
									title: '配送信息添加',
									href: contextPath + '/p100101.html?ppid=' + PubOPT.getCurrentPageId()
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
									title: '配送信息编辑',
									href: contextPath + '/p100101.html?ppid=' + PubOPT.getCurrentPageId() + '&code=' + model.activity_id
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
											this.close();
											var sqllist = [];
											for(var i=0; i<list.length; i++){
												sqllist.push({sqlID: "wx_activity_5", parameters: {activity_id:list[i].activity_id}});   
											}
											if(AjaxUtil.command.isSucceed(AjaxUtil.command.executeTransaction(sqllist))){
												store.load({start: 0, pageIndex: 0});
											} else {
												BUI.Message.Alert('删除失败','error');
												store.load({start: 0, pageIndex: 0});
											}
											
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
			                 content: '&nbsp;订单编号&nbsp;<input name="key" id="key" type="text" style="border:1px solid #999;width:200px;"/>'
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

