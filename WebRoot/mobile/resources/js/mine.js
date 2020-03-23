function delGoods(gid) {
	if(AjaxUtil.command.isSucceed(AjaxUtil.command.executeUpdate("wx_goods_collect_3", {id:gid}))) {
		var n = parseInt($("#g_count").text());
		$("#g_count").text(n-1);
		$("#gid"+gid).remove();
	}
}