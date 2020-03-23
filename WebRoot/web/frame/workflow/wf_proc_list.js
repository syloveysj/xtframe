BUI.use(['bui/layout','bui/grid','bui/data','bui/menu','bui/overlay','bui/form'],function (Layout,Grid,Data,Menu,Overlay,Form) {
	var Store = Data.Store,
		columns = [{
				title : '业务编码',
				dataIndex :'procinstkey',
				width: 50
			},{
				title : '业务名称',
				dataIndex :'procinstname',
				width: 100
			},{
				title : '发起人',
				dataIndex : 'realname',
				width: 60,
				renderer : function (value, record) {
					return value + '[' + record.username + ']';
				}
			},{
				title : '发起时间',
				dataIndex : '_time',
				width: 80
			},{
				title : '状态',
				dataIndex : 'state_',
				width: 40,
				renderer : function (value, record) {
					if(value == 'ended') {
						if(record.state=='discard') {
							return '<span class="label">已作废</span>';
						} else {
							return '<span class="label label-success">已办结</span>';
						}
					} else {
						return '<span class="label label-warning">办理中</span>';
					}
				}
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
			key: '',
			state: '0'
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
								sqlID: "workflow_history_proc_1",
								parameters: {sortname:data.params.field, sortorder:data.params.direction, key:params.key, state:params.state},
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
						title : '业务列表',
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
						}, {
			                 content: '&nbsp;&nbsp;<input name="state" type="radio" value="0" checked="true"/>&nbsp;全部&nbsp;&nbsp;&nbsp;&nbsp;<input name="state" type="radio" value="1" />&nbsp;已办结&nbsp;&nbsp;&nbsp;&nbsp;<input name="state" type="radio" value="2" />&nbsp;办理中&nbsp;&nbsp;&nbsp;&nbsp;<input name="state" type="radio" value="3" />&nbsp;已作废'
						}]
					},
					bbar:{
						pagingBar:true
					}
				}],
			plugins : [Layout.Border]
		});

	control.render();
	$("input[name='state']").change(function(){
		params.state = $("input[name='state']:checked").val();
		store.load({start: 0, pageIndex: 0});
	});
	
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