BUI.use(['bui/layout','bui/grid','bui/data','bui/menu','bui/overlay','bui/form','bui/mask','bui/tooltip','bui/imgview'],function (Layout,Grid,Data,Menu,Overlay,Form,Mask,Tooltip,Imgview) {
	var paramObj = PubOPT.GetParamObj(window.location.search);
	//配置控件的根节点
	var pgForm = new Form.Form({
		srcNode : '#J_Form'
	}).render();
	
	var viewContent = new Imgview.ViewContent({
        render: "#imgviewWrap",
        autoRender: false, // 设置为true就自动渲染，默认为false！
        // 以下属性全部可以set来修改。
        width: 300,
        height: 200,
        imgSrc : '/upload/image/20150828/c158b6e67f6048d4b004001391abdf0e.png',
        overflowSize: 100, // 边界回弹像素,默认100,实际上是取Math.min(overflowSize,imgNowWidth,imgNowHeight)
        drag: false //是否可以拖动，默认为true
      });
      // autoRender如果为true就代表自动渲染。
      viewContent.render();
      
	if("code" in paramObj) {
		var data = AjaxUtil.command.executeQuery("wx_activity_2", {activity_id: paramObj.code});
		if(AjaxUtil.command.isSucceed(data) && data.rows.length>0) {
			PubOPT.setFormValue(data.rows[0]);
			var row = data.rows[0];
			if(row.img_path == "/upload/image/20150828/c158b6e67f6048d4b004001391abdf0e.png"){
				$('#img_path').val("");
			}
			//图片显示
			
			if(("img_path" in data.rows[0]) && data.rows[0].img_path!=null && data.rows[0].img_path.length>1) {
				viewContent.set("imgSrc",contextPath + data.rows[0].img_path);
				$("#fileUpload").text("更换图片");
			}
		}
	}
	
	var tips = new Tooltip.Tips({
        tip : {
          trigger : '.x-icon-error', //出现此样式的元素显示tip
          alignType : 'right', //默认方向
          elCls : 'tips tips-warning tips-no-icon tip1',
          offset : 10 //距离左边的距离
        }
      });
      tips.render();
      
	$("#btn_save").click(function() {
		//检测变量是否实例化
		if(!pgForm.isValid()) return;
		var fromParam = PubOPT.formatObjToArray(['activity_name','activity_url','activity_stime', 'activity_qtime','img_path','remark','position']);
		if(fromParam.activity_time>fromParam.activity_stime){
			BUI.Message.Alert('活动结束时间不能小于开始时间','error');
			return;
		}
		var fromJson;
		if("code" in paramObj){
			fromJson = ({
				activity_id : paramObj.code ,
				activity_name : fromParam.activity_name,
				activity_url : fromParam.activity_url,
				activity_stime : fromParam.activity_stime,
				activity_qtime : fromParam.activity_qtime,
				img_path : fromParam.img_path,
				remark : fromParam.remark,
				position : fromParam.position
			});
		}else{
			var isne = AjaxUtil.command.executeQuery("wx_activity_4", {});
			fromJson = ({
				activity_id : isne.rows[0].seq,
				activity_name : fromParam.activity_name,
				activity_url : fromParam.activity_url,
				activity_stime : fromParam.activity_stime,
				activity_qtime : fromParam.activity_qtime,
				img_path : fromParam.img_path,
				remark : fromParam.remark,
				position : fromParam.position
			});
		}
		if(AjaxUtil.command.isSucceed(AjaxUtil.command.executeUpdate("wx_activity_3",fromJson))) {
			colsePage();
		} else {
			BUI.Message.Alert('保存失败','error');
		}
	});
	
	

	var uploadDialog = new Overlay.Dialog({
		title:'图片上传',
		width:560,
		height:140,
		contentId:'uploadDialog',
		buttons:[{ text:'上　传', elCls : 'button button-primary', handler : function(){
				$("#upload_Form").submit();
				this.hide();
			}},
			{ text:'关　闭', elCls : 'button', handler : function(){
				this.hide();
			}}]
	});

	$("#btn_gb").click(function(){
		colsePage();
	});
	$("#fileUpload").click(function() {
		uploadDialog.show();
	});
	$('#hidden_frame').load(function() {
		// 获取上传文件后返回的消息
		var msg = $(document.getElementById('hidden_frame').contentWindow.document.body).html();
		var data = $.evalJSON(msg);
		if(("success" in data) && data.success) {
			BUI.Message.Show({
				msg : '图片上传成功！',
				icon : 'success',
				buttons : [],
				autoHide : true,
				autoHideDelay : 800
			});
			
			$("#img_path").val(data.relativePath);
			$("#fileUpload").text("更换图片");
			//图片上传成功，加载到viewContent控件下
			var img = $('#img_path').val();
			if(img != ''){
				viewContent.set('imgSrc',img);
			}
		}
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

