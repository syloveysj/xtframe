$(document).ready(function(e) {
});

function delAddress(id) {
	if(AjaxUtil.command.isSucceed(AjaxUtil.command.executeUpdate("wx_address_manager_4", {addr_id: id}))) {
		$("#aid"+id).remove();
	} else {
		alert("删除失败！");
	}
}

function defAddress(id) {
	if(AjaxUtil.command.isSucceed(AjaxUtil.command.executeTransaction([{sqlID: "wx_address_manager_6", parameters: {}}, {sqlID: "wx_address_manager_7", parameters: {addr_id: id}}]))) {
		$(".isok").removeClass("isok");
		$("#state"+id).addClass("isok");
	} else {
		alert("删除失败！");
	}
}