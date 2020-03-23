BUI.use(['bui/layout','bui/grid','bui/data','bui/menu','bui/overlay','bui/form','bui/mask'],function (Layout,Grid,Data,Menu,Overlay,Form,Mask) {
	var paramObj = PubOPT.GetParamObj(window.location.search);
	//配置控件的根节点
	var pgForm = new Form.Form({
		srcNode : '#J_Form'
	}).render();
	
	if("code" in paramObj) {
		var data = AjaxUtil.command.executeQuery("wx_recommend_4", {tj_id: paramObj.code});
		if(AjaxUtil.command.isSucceed(data) && data.rows.length>0) {
			PubOPT.setFormValue(data.rows[0]);
		}
	}
	
	$("#btn_save").click(function() {
		//检测变量是否实例化
		if(!pgForm.isValid()) return;
		var fromParam = PubOPT.formatObjToArray(['goods_id', 'sortno', 'remark']);
		var fromJson;
		if("code" in paramObj){
			fromJson = ({
				tj_id : paramObj.code ,
				goods_id : fromParam.goods_id,
				sortno : fromParam.sortno,
				remark : fromParam.remark
			});
		}else{
			var isne = AjaxUtil.command.executeQuery("wx_recommend_6", {});
			fromJson = ({
				tj_id : isne.rows[0].ne ,
				goods_id : fromParam.goods_id,
				sortno : fromParam.sortno,
				remark : fromParam.remark
			});
		}
		if(AjaxUtil.command.isSucceed(AjaxUtil.command.executeUpdate("wx_recommend_3", fromJson))) {
			colsePage();
		} else {
			BUI.Message.Alert('保存失败','error');
		}
	});
	
	var Store = Data.Store,
	columns1 = [
        {
			title : '商品编码',
			dataIndex :'goods_id',
			elCls : 'center',
			width: 120
		},{
			title : '商品名称',
			dataIndex :'goods_name',
			elCls : 'left',
			width: 200
		},{
           title : '作者',
           dataIndex :'goods_author',
           width:120,
        },{
			title : '厂家',
			dataIndex : 'goods_factory',
			elCls : 'left',
			width: 200
		}],
		params = {
			key1: ''
		},
	store1 = new Store({
		url : contextPath + '/p100105.html',
	    autoLoad : false,
	    root : 'query',
	    totalProperty : 'total',
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
			field : 'bk_code',
			direction : 'desc'
	    },
	    listeners:{
			'beforeload': function (data) {
				data.params.key = params.key1;
				data.params.offset = data.params.pageIndex*data.params.limit;
				data.params.maxsize = data.params.limit;
			}
		}
	});
    
	var goods_idDia = new Overlay.Dialog({
		title:'商品列表',
		width:770,
		height:460,
		contentId:'goods_idDialog',
		buttons:[{ text:'确定', elCls : 'button button-primary', handler : function(){
				var list = grid1.getSelection();
				if(list.length > 0) {
					$('#goods_id').val(list[0].goods_id);
					$('#goods_name').val(list[0].goods_name);
					pgForm.getField('goods_name').valid();
            		this.hide();
				} else {
					BUI.Message.Show({
						msg : '请选择一条记录',
						icon : 'info',
						buttons : [],
						autoHide : true,
						autoHideDelay : 1000
					});
				}
			}},
			{ text:'关闭', elCls : 'button', handler : function(){
				this.hide();
			}}]
	});
	
	
	var grid1 = new Grid.Grid({
        render: '#goods_idGrid',
        forceFit: true,
        columns: columns1,
        store: store1,
        height:340,
        loadMask : new Mask.LoadMask({el : 'div:has(#customGrid):last'}),
        plugins : [Grid.Plugins.RadioSelection],
		tbar:{
			items : [{
                 content: '&nbsp;商品名称&nbsp;<input name="key1" id="key1" type="text" style="border:1px solid #999;width:200px;"/>'
			}, {
				btnCls : 'button button-small',
				text : '<i class="icon-search"></i>搜索',
				handler: searchKey1
			}]
		},
		bbar:{
			pagingBar:true
		},
	    listeners:{
			'itemdblclick': function (e) {
				setCustom(e.item);
				cd.hide();
			}
		}
      });
    grid1.render();
    store1.load();
	
	
    
	
	
	$("#but_goods_id").click(function() {
		goods_idDia.show();
	});
	
	$("#btn_gb").click(function(){
		colsePage();
	});
	
	
	$("#key1").keydown(function (e) {
		var curKey = e.which;
		if (curKey == 13) {
			searchKey1();
		}
	});
	
	
	function searchKey1(){
		params.key1 = $('#key1').val();
		store1.load({start: 0, pageIndex: 0});
	}
	
	function colsePage() {
		PubOPT.openPage({
			id: PubOPT.getCurrentPageId(),
			isClose: true
		});
		if("ppid" in paramObj) {
			PubOPT.openPage({
				id: paramObj.ppid,
				reload: true
			});
		}
	}
});

