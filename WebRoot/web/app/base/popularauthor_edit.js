BUI.use(['bui/layout','bui/grid','bui/data','bui/menu','bui/overlay','bui/form','bui/mask'],function (Layout,Grid,Data,Menu,Overlay,Form,Mask) {
	var paramObj = PubOPT.GetParamObj(window.location.search);
	//配置控件的根节点
	var pgForm = new Form.Form({
		srcNode : '#J_Form'
	}).render();
	
	if("code" in paramObj) {
		var data = AjaxUtil.command.executeQuery("wx_popu_5", {tj_id: paramObj.code});
		if(AjaxUtil.command.isSucceed(data) && data.rows.length>0) {
			PubOPT.setFormValue(data.rows[0]);
		}
	}
	
	$("#btn_save").click(function() {
		//检测变量是否实例化
		if(!pgForm.isValid()) return;
		var fromParam = PubOPT.formatObjToArray(['author_id', 'sortno', 'remark']);
		var fromJson;
		if("code" in paramObj){
			fromJson = ({
				tj_id : paramObj.code ,
				author_id : fromParam.author_id,
				sortno : fromParam.sortno,
				remark : fromParam.remark
			});
		}else{
			var isne = AjaxUtil.command.executeQuery("wx_popu_4", {});
			fromJson = ({
				tj_id : isne.rows[0].ne ,
				author_id : fromParam.author_id,
				sortno : fromParam.sortno,
				remark : fromParam.remark
			});
		}
		if(AjaxUtil.command.isSucceed(AjaxUtil.command.executeUpdate("wx_popu_3", fromJson))) {
			colsePage();
		} else {
			BUI.Message.Alert('保存失败','error');
		}
	});
	
	var Store = Data.Store,
		columns1 = [
        {
			title : '作者',
			dataIndex :'author_name',
			elCls : 'left',
			width: 150
		},{
           title : '生日',
           dataIndex :'birth',
           width:130,
        }],
		params = {
			key1: ''
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
								sqlID: "wx_popu_2",
								parameters: {sortname:data.params.field, sortorder:data.params.direction, goods_name:params.key1},
								offset: data.params.pageIndex*data.params.limit,
								maxsize: data.params.limit
							});
				}
			}
		});
	
    
	var author_idDia = new Overlay.Dialog({
		title:'作者列表',
		width:430,
		height:460,
		contentId:'author_idDialog',
		buttons:[{ text:'确定', elCls : 'button button-primary', handler : function(){
				var list = grid1.getSelection();
				if(list.length > 0) {
					$('#author_id').val(list[0].author_id);
					$('#author_name').val(list[0].author_name);
					pgForm.getField('author_name').valid();
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
        render: '#author_idGrid',
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
	
	
    
	
	
	$("#but_author_id").click(function() {
		author_idDia.show();
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

