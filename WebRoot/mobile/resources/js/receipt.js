var hpd = 0;
function onclickPhoto(num){
	hpd = num;
	if(num == 5){
		for(var i = 1;i<=num;i++){
			$("#i"+i).attr("class","isok");
		}
	}else{
		for(var i = num;i<=5;i++){
			$("#i"+i).attr("class","");
		}
		for(var i = 1;i<=num;i++){
			$("#i"+i).attr("class","isok");
		}
	}
};

function subbutton(){
	var data = AjaxUtil.command.executeQuery("wx_order_receipt_1", {orders_id: $('#or_id').val()});
	if(AjaxUtil.command.isSucceed(data) && data.rows.length>0) {
		var rows = data.rows;
		var sqllist = [];
		for(var i=0;i<rows.length;i++){
			sqllist.push({sqlID: "wx_comment_11", parameters: {comment_contant:$("#comment_contant").val(),goods_id:rows[0].goods_id,comment_hpd:hpd}}); 
		}
		sqllist.push({sqlID: "wx_comment_12", parameters: {orders_id:$('#or_id').val()}});
		if(AjaxUtil.command.isSucceed(AjaxUtil.command.executeTransaction(sqllist))){
			alert("评论成功");
			window.location.href='p100069.html';
		}else{
			alert("评论失败");
		}
	}
};