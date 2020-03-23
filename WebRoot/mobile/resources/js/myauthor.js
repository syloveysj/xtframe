function delAuthor(aid) {
	if(AjaxUtil.command.isSucceed(AjaxUtil.command.executeUpdate("wx_author_collect_3", {id:aid}))) {
		var n = parseInt($("#a_count").text());
		$("#a_count").text(n-1);
		$("#aid"+aid).remove();
	}
}