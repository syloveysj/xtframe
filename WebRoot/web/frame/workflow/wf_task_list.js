BUI.use(['bui/layout','bui/grid','bui/data','bui/menu','bui/overlay','bui/form'],function (Layout,Grid,Data,Menu,Overlay,Form) {
	var Store = Data.Store,
		columns = [{
				title : '任务编码',
				dataIndex :'id',
				width: 60,
				renderer : function (value, record) {
					return value + ' <span class="badge">' + record.procInstKey + '</span>';
				}
			},{
				title : '任务名称',
				dataIndex :'name',
				width: 100,
				renderer : function (value, record) {
					return value + ' <span class="label label-info">' + record.procInstName + '</span>';
				}
			},{
				title : '到达时间',
				dataIndex : 'createTime',
				width: 80
			},{
				title : '办理',
				dataIndex : 'id',
				elCls : 'left',
				width: 40,
				renderer : function (value, record) {
					return '<button class="button button-success" onclick="taskHandler(this)" action="task" taskid="' + value + '" taskname="' + record.name + '">办理</button>';
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
				field : 'createTime',
				direction : 'desc'
		    },
		    listeners:{
				'beforeload': function (data) {
					data.params.iFunc = AjaxUtil.command.FUNC_TASK_LIST;
					data.params.strData = $.toJSON({
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
						title : '待办列表',
						fit : 'both'
					},
					id : 'grid',
					forceFit: true,	// 列宽按百分比自适应
					columns : columns,
					store : store,
					height: '420',
					plugins : [Grid.Plugins.RowNumber],
					bbar:{
						pagingBar:true
					}
				}],
			plugins : [Layout.Border]
		});

	control.render();
	
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

function taskHandler(o){
	var me = $(o);
	openPage(contextPath + "/p110005.html?ppid=" + PubOPT.getCurrentPageId() + "&taskid=" + me.attr('taskid'), '办理-' + me.attr('taskname'));
}

function openPage(url, title) {
	var pgid = 'temp_' + PubOPT.getPageTempIndex();
	PubOPT.openPage({
		id: pgid,
		title: title,
		href: url
	});
}