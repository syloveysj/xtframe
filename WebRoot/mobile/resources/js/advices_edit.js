$(document).ready(function(e) {
	$("#save_def").click(function(){
		saveAdvices();
	});
});

function saveAdvices() {
	var data = AjaxUtil.command.executeQuery("wx_advices_2");
	var id = data.rows[0].seq;
	var advices_info = $("#advices_info").val();
	if(AjaxUtil.command.isSucceed(AjaxUtil.command.executeUpdate("wx_advices_3",{id:id,advices_info:advices_info}))) {
		window.location.href = basePath + '/p100110.html';
	} else {
		alert("保存失败！");
	}
}