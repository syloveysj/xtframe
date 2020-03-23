$(document).ready(function(e) {
	var id = $("#id").val();
	if(id.length > 0) {
		var data = AjaxUtil.command.executeQuery("wx_address_manager_5", {addr_id:id});
		if(AjaxUtil.command.isSucceed(data) && data.rows.length>0) {
			var row = data.rows[0];
			$('#addr_name').val(row.addr_name);
			$('#consignee').val(row.consignee);
			$('#mobile').val(row.mobile);
			$('#tel').val(row.tel);
			$('#address').val(row.address);
			$('#postalcode').val(row.postalcode);
		}
	}
	
	$("#save_def").click(function(){
		saveAddress();
	});
});

function saveAddress() {
	var id = $("#id").val(), sqlid;
	if(id.length > 0) {
		sqlid = "wx_address_manager_3";
	} else {
		sqlid = "wx_address_manager_2";
	}
	
	if(AjaxUtil.command.isSucceed(AjaxUtil.command.executeTransaction([{sqlID: "wx_address_manager_6", parameters: {}},
		{sqlID: sqlid, parameters: {
			addr_name: $('#addr_name').val(),
			consignee: $('#consignee').val(),
			mobile: $('#mobile').val(),
			tel: $('#tel').val(),
			address: $('#address').val(),
			postalcode: $('#postalcode').val(),
			addr_id: id
		}}]))) {
		window.location.href = basePath + '/p100070.html';
	} else {
		alert("保存失败！");
	}
}