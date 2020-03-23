BUI.use(['bui/layout','bui/grid','bui/data','bui/menu','bui/overlay','bui/form'],function (Layout,Grid,Data,Menu,Overlay,Form) {
	var Store = Data.Store,
		columns = [{
				title : '任务编码',
				dataIndex :'taskid',
				width: 60,
				renderer : function (value, record) {
					return value + ' <span class="badge">' + record.procinstkey + '</span>';
				}
			},{
				title : '任务名称',
				dataIndex :'nodename',
				width: 100,
				renderer : function (value, record) {
					return value + ' <span class="label label-info">' + record.procinstname + '</span>';
				}
			},{
				title : '完成时间',
				dataIndex : '_time',
				width: 80
			},{
				title : '查看',
				dataIndex : 'procinstid',
				elCls : 'left',
				width: 40,
				renderer : function (value, record) {
					return '<button class="button button-success" onclick="viewHandler(this)" action="look" piid="' + value + '" procname="' + record.procinstname + '">查看</button>';
				}
			}],
		params = {
			key: ''
		};
 
	var store = new Store({
			url : contextPath + '/server/ajax.do',  //设置加载数据的URL
		    autoLoad : true,    //创建Store时自动加载数据
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
		    sortInfo : {
				field : '_time',
				direction : 'desc'
		    },
		    listeners:{
				'beforeload': function (data) {
					data.params.iFunc = AjaxUtil.command.FUNC_PAGING;
					data.params.strData = $.toJSON({
								sqlID: "workflow_history_task_1",
								parameters: {sortname:data.params.field, sortorder:data.params.direction, key:params.key},
								offset: data.params.pageIndex*data.params.limit,
								maxsize: data.params.limit
							});
				}
			}
		});
	
	var control = new Layout.Viewport({
			elCls : 'ext-border-layout',
			children : [{
					xclass : 'grid', //Grid
					layout : {
						region : 'center',
						title : '已办列表',
						fit : 'both'
					},
					id : 'grid',
					forceFit: true,	// 列宽按百分比自适应
					columns : columns,
					store : store,
					height: '420',
					plugins : [Grid.Plugins.RowNumber],
					tbar:{
						items : [{
			                 content: '&nbsp;&nbsp;<input name="key" id="key" type="text" style="border:1px solid #999;width:200px;"/>'
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
	
	$("#key").keydown(function (e) {
		var curKey = e.which;
		if (curKey == 13) {
			searchKey();
		}
	});
	
	function searchKey() {
		params.key = $('#key').val();
		store.load({start: 0, pageIndex: 0});
	}
	
	var viewWin = new Overlay.Dialog({
		title:'流程设计图',
		width:770,
		height:460,
		contentId:'viewDialog',
		buttons:[{ text:'关闭', elCls : 'button', handler : function(){
				this.hide();
			}}]
	});
	
	$("button[action=view]").click(function(){
		var me = $(this);
		$("#viewImg").attr('src', contextPath + "/server/processDefinitionImage.do?id=" + me.attr('pdid'));
		viewWin.show();
	});
});

function viewHandler(o){
	var me = $(o);
	openPage(contextPath + "/p110005.html?piid=" + me.attr('piid'), '查看-' + me.attr('procname'));
}

function openPage(url, title) {
	var pgid = 'temp_' + PubOPT.getPageTempIndex();
	PubOPT.openPage({
		id: pgid,
		title: title,
		href: url
	});
}