BUI.use(['bui/layout','bui/grid','bui/data','bui/menu','bui/overlay','bui/form','bui/mask'],function (Layout,Grid,Data,Menu,Overlay,Form,Mask) {
	var paramObj = PubOPT.GetParamObj(window.location.search);
	//配置控件的根节点
	pgForm = new Form.Form({
		srcNode : '#J_Form'
	}).render();
	
	if("code" in paramObj) {
		var data = AjaxUtil.command.executeQuery("wx_freight_6", {id: paramObj.code});
		if(AjaxUtil.command.isSucceed(data) && data.rows.length>0) {
			$('#lx').val(data.rows[0].lx);
			$('#state').val(data.rows[0].state);
			if(data.rows[0].lx == '1'){
				 document.getElementById("ds1").style.display="";
				 document.getElementById("ds2").style.display="none";
				 document.getElementById("ds3").style.display="none";
				 document.getElementById("ds4").style.display="none";
				 document.getElementById("ds5").style.display="none";
				$('#mby').val(data.rows[0].max_money);
			}else if(data.rows[0].lx == '2'){
				document.getElementById("ds1").style.display="none";
				 document.getElementById("ds2").style.display="";
				 document.getElementById("ds3").style.display="";
				 document.getElementById("ds4").style.display="none";
				 document.getElementById("ds5").style.display="none";
				$('#min_money').val(data.rows[0].min_money);
				$('#max_money').val(data.rows[0].max_money);
			}else if(data.rows[0].lx == '3'){
				 document.getElementById("ds1").style.display="none";
				 document.getElementById("ds2").style.display="none";
				 document.getElementById("ds3").style.display="none";
				 document.getElementById("ds4").style.display="";
				 document.getElementById("ds5").style.display="none";
				$('#postage_id').val(data.rows[0].postage_id);
				$('#postage_name').val(data.rows[0].kd_name);
			}else if(data.rows[0].lx == '4'){
				document.getElementById("ds1").style.display="none";
				 document.getElementById("ds2").style.display="none";
				 document.getElementById("ds3").style.display="none";
				 document.getElementById("ds4").style.display="none";
				 document.getElementById("ds5").style.display="";
				$('#gdsf').val(data.rows[0].max_money);
			}
		}
	}
	
	 $("#lx").change(function(){
		 if($("#lx").val() == '1'){
			 document.getElementById("ds1").style.display="";
			 document.getElementById("ds2").style.display="none";
			 document.getElementById("ds3").style.display="none";
			 document.getElementById("ds4").style.display="none";
			 document.getElementById("ds5").style.display="none";
		 }else if($("#lx").val() == '2'){
			 document.getElementById("ds1").style.display="none";
			 document.getElementById("ds2").style.display="";
			 document.getElementById("ds3").style.display="";
			 document.getElementById("ds4").style.display="none";
			 document.getElementById("ds5").style.display="none";
		 }else if($("#lx").val() == '3'){
			 document.getElementById("ds1").style.display="none";
			 document.getElementById("ds2").style.display="none";
			 document.getElementById("ds3").style.display="none";
			 document.getElementById("ds4").style.display="";
			 document.getElementById("ds5").style.display="none";
		 }else if($("#lx").val() == '4'){
			 document.getElementById("ds1").style.display="none";
			 document.getElementById("ds2").style.display="none";
			 document.getElementById("ds3").style.display="none";
			 document.getElementById("ds4").style.display="none";
			 document.getElementById("ds5").style.display="";
		 } 
	 });
	
	
	$("#btn_save").click(function() {
		var fromParam = PubOPT.formatObjToArray(['lx', 'mby', 'gdsf','min_money','max_money','postage_id','state']);
		var idcode = 0;
		if("code" in paramObj){
			idcode = paramObj.code;
		}else{
			var isne = AjaxUtil.command.executeQuery("wx_freight_2", {});
			idcode = isne.rows[0].next;
		}
		var min_money = 0;
		var max_money = 0;
		if(fromParam.lx == '1'){
			max_money = fromParam.mby;
		}else if(fromParam.lx == '2'){
			min_money = fromParam.min_money;
			max_money = fromParam.max_money;
		}else if(fromParam.lx == '3'){
			
		}else if(fromParam.lx == '4'){
			max_money = fromParam.gdsf;
		}
		fromJson = ({
			id : idcode,
			lx : fromParam.lx,
			min_money : min_money,
			max_money : max_money,
			postage_id : fromParam.postage_id,
			state : fromParam.state
		});
		var sqllist = [];
		sqllist.push({sqlID: "wx_freight_3", parameters: fromJson});
		if(fromParam.state == '1'){
			sqllist.push({sqlID: "wx_freight_4", parameters: {id:idcode}});
		}
		if(AjaxUtil.command.isSucceed(AjaxUtil.command.executeTransaction(sqllist))) {
			colsePage();
		} else {
			BUI.Message.Alert('保存失败','error');
		}
	});
	
	var Store = Data.Store,
		columns1 = [
        {
			title : '快递收费公司',
			dataIndex :'kd_name',
			elCls : 'left',
			width: 380
		},{
			title : '状态',
			dataIndex : 'state',
			elCls : 'left',
			width: 100,
			renderer:function(value,record){
				if(value == '0'){
					return '<span class="badge badge-info">0</span>';
				}else if(value == '1'){
					return '<span class="badge badge-success">1</span>';
				}
			}
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
								sqlID: "wx_freight_5",
								parameters: {sortname:data.params.field, sortorder:data.params.direction, orders_id:params.key1},
								offset: data.params.pageIndex*data.params.limit,
								maxsize: data.params.limit
							});
				}
			}
		});
	
    
	var postageDia = new Overlay.Dialog({
		title:'快递运费列表',
		width:600,
		height:460,
		contentId:'postage_idDialog',
		buttons:[{ text:'确定', elCls : 'button button-primary', handler : function(){
				var list = grid1.getSelection();
				if(list.length > 0) {
					$('#postage_id').val(list[0].postage_id);
					$('#postage_name').val(list[0].kd_name);
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
        render: '#postage_idGrid',
        forceFit: true,
        columns: columns1,
        store: store1,
        height:340,
        loadMask : new Mask.LoadMask({el : 'div:has(#customGrid):last'}),
        plugins : [Grid.Plugins.RadioSelection],
		tbar:{
			items : []
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
	
	
	
	
	$("#but_postage_id").click(function() {
		postageDia.show();
	});
	
	
	$("#btn_gb").click(function(){
		colsePage();
	});
	
	
	
	
	
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

