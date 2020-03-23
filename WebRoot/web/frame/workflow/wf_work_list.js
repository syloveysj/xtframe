BUI.use(['bui/layout','bui/grid','bui/data','bui/menu','bui/overlay','bui/form'],function (Layout,Grid,Data,Menu,Overlay,Form) {
	var viewWin = new Overlay.Dialog({
		title:'流程设计图',
		width:620,
		height:650,
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
	
	$("button[action=new]").click(function(){
		var me = $(this);
		openPage(contextPath + "/p110005.html?pdid=" + me.attr('pdid'), '新建-' + me.attr('pdname'));
	})
});

function openPage(url, title) {
	var pgid = 'temp_' + PubOPT.getPageTempIndex();
	PubOPT.openPage({
		id: pgid,
		title: title,
		href: url
	});
}