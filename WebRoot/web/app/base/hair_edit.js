BUI.use(['bui/layout','bui/grid','bui/data','bui/menu','bui/overlay','bui/form','bui/mask'],function (Layout,Grid,Data,Menu,Overlay,Form,Mask) {
	var paramObj = PubOPT.GetParamObj(window.location.search);
	//配置控件的根节点
	var pgForm = new Form.Form({
		srcNode : '#J_Form'
	}).render();
	
	if("code" in paramObj) {
		var data = AjaxUtil.command.executeQuery("wx_hair_6", {orders_id: paramObj.code});
		if(AjaxUtil.command.isSucceed(data) && data.rows.length>0) {
			PubOPT.setFormValue(data.rows[0]);
		}
		$("#orders_id").attr("disabled", true);
	}
	
	$("#btn_save").click(function() {
		//检测变量是否实例化
		if(!pgForm.isValid()) return;
		var fromParam = PubOPT.formatObjToArray(['orders_id', 'kdbh', 'kddh']);
		var sqllist = [];
		sqllist.push({sqlID: "wx_hair_4", parameters: fromParam});
		sqllist.push({sqlID: "wx_hair_5", parameters: {orders_id:fromParam.orders_id}});
		if(AjaxUtil.command.isSucceed(AjaxUtil.command.executeTransaction(sqllist))) {
			colsePage();
		} else {
			BUI.Message.Alert('保存失败','error');
		}
	});
	
	var Store = Data.Store,
		columns1 = [
        {
			title : '订单编号',
			dataIndex :'orders_id',
			elCls : 'center',
			width: 140
		},{
           title : '用户名',
           dataIndex :'',
           width:130,
           renderer:function(value,record){
        	 if(record.realname ==null || record.realname == ''){
        		return '<span></span>';
        	 }else{
	        	return '<span>'+record.realname+'['+record.username+']</span>';
        	 }
          }
        },{
			title : '收货人',
			dataIndex : 'consignee',
			elCls : 'left',
			width: 130
		},{
			title : '总价',
			dataIndex : 'total_price',
			elCls : 'right',
			width: 100
		},{
			title : '联系电话',
			dataIndex : 'tel',
			elCls : 'left',
			width: 140
		}],
		columns2 = [
		{
			title : '快递编号',
			dataIndex :'kdbh',
			elCls : 'left',
			width: 120
		},{
			title : '快递公司',
			dataIndex :'kdmc',
			elCls : 'left',
			width: 200
		}],
		params = {
			key2: '',
			key1: '',
		},
		store1 = new Store({
			url : contextPath + '/server/ajax.do',
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
				field : 'dw_code',
				direction : 'desc'
		    },
		    listeners:{
				'beforeload': function (data) {
					data.params.iFunc = AjaxUtil.command.FUNC_PAGING;
					data.params.strData = $.toJSON({
								sqlID: "wx_hair_2",
								parameters: {sortname:data.params.field, sortorder:data.params.direction, orders_id:params.key1},
								offset: data.params.pageIndex*data.params.limit,
								maxsize: data.params.limit
							});
				}
			}
		});
		store2 = new Store({
			url : contextPath + '/server/ajax.do',
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
				field : 'dw_code',
				direction : 'desc'
		    },
		    listeners:{
				'beforeload': function (data) {
					data.params.iFunc = AjaxUtil.command.FUNC_PAGING;
					data.params.strData = $.toJSON({
								sqlID: "wx_hair_3",
								parameters: {sortname:data.params.field, sortorder:data.params.direction, kdmc:params.key2},
								offset: data.params.pageIndex*data.params.limit,
								maxsize: data.params.limit
							});
				}
			}
		});
	
    
	var ordersDia = new Overlay.Dialog({
		title:'书籍列表',
		width:770,
		height:460,
		contentId:'orders_idDialog',
		buttons:[{ text:'确定', elCls : 'button button-primary', handler : function(){
				var list = grid1.getSelection();
				if(list.length > 0) {
					$('#orders_id').val(list[0].orders_id);
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
	var kdmcDia = new Overlay.Dialog({
		title:'书籍列表',
		width:450,
		height:460,
		contentId:'kdmcDialog',
		buttons:[{ text:'确定', elCls : 'button button-primary', handler : function(){
				var list = grid2.getSelection();
				if(list.length > 0) {
					$('#kdmc').val(list[0].kdmc);
					$('#kdbh').val(list[0].kdbh);
					pgForm.getField('kdbh').valid();
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
        render: '#orders_idGrid',
        forceFit: true,
        columns: columns1,
        store: store1,
        height:340,
        loadMask : new Mask.LoadMask({el : 'div:has(#customGrid):last'}),
        plugins : [Grid.Plugins.RadioSelection],
		tbar:{
			items : [{
                 content: '订单编号&nbsp;<input name="key1" id="key1" type="text" style="border:1px solid #999;width:200px;"/>'
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
	
	
	var grid2 = new Grid.Grid({
        render: '#kdmcGrid',
        forceFit: true,
        columns: columns2,
        store: store2,
        height:340,
        loadMask : new Mask.LoadMask({el : 'div:has(#customGrid):last'}),
        plugins : [Grid.Plugins.RadioSelection],
		tbar:{
			items : [{
                 content: '快递公司&nbsp;<input name="key2" id="key2" type="text" style="border:1px solid #999;width:200px;"/>'
			}, {
				btnCls : 'button button-small',
				text : '<i class="icon-search"></i>搜索',
				handler: searchKey2
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
    grid2.render();
    store2.load();
    
	
	
	$("#but_orders_id").click(function() {
		ordersDia.show();
	});
	
	$("#but_kdmc").click(function(){
		kdmcDia.show();
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
	
	$("#key2").keydown(function (e) {
			var curKey = e.which;
			if (curKey == 13) {
				searchKey2();
			}
		});
	
	function searchKey1(){
		params.key1 = $('#key1').val();
		store1.load({start: 0, pageIndex: 0});
	}
	
	function searchKey2(){
		params.key2 = $('#key2').val();
		store2.load({start: 0, pageIndex: 0});
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

