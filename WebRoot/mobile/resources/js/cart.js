$(document).ready(function(e) {
});

function lessNum(vn, gid) {
	var n = parseInt($('#'+vn).val());
	var ret = n;
	if(n < 2) {
		ret = 1;
	} else {
		ret = n - 1;
	}
	
	if(AjaxUtil.command.isSucceed(AjaxUtil.command.executeUpdate("wx_cart_2", {id:gid, num:ret}))) {
		$('#'+vn).val(ret);
		statistics();
	}
}

function addNum(vn, gid) {
	var n = parseInt($('#'+vn).val());
	var ret = n;
	if(n > 98) {
		ret = 99;
	} else {
		ret = n + 1;
	}
	
	if(AjaxUtil.command.isSucceed(AjaxUtil.command.executeUpdate("wx_cart_2", {id:gid, num:ret}))) {
		$('#'+vn).val(ret);
		statistics();
	}
}

function delGoods(gid) {
	if(AjaxUtil.command.isSucceed(AjaxUtil.command.executeUpdate("wx_cart_3", {id:gid}))) {
		$("li[code='gid"+gid+"']").remove();
		statistics();
	}
}

function clearCart() {
	if(AjaxUtil.command.isSucceed(AjaxUtil.command.executeUpdate("wx_cart_4", {}))) {
		$("li[code]").remove();
		statistics();
	}
}

function statistics() {
	var s = 0, t = 0;
	$("li[code]").each(function(){
		var me = $(this);
		if(me.find("input[code='sel']:checked").length > 0) {
			var n = parseInt(me.find("[code='vnum']").val());
			var p = parseFloat(me.find("[code='price']").val());
			s += n;
			t += n*p;
		}
	});
	$("#sum").text("共"+s+"册");
	$("#total").text("￥"+(Math.round(t*100)/100));
}

function settleAccounts() {
	var goods=[];
	//var arrSql = [];
	//arrSql.push({sqlID:"wx_cart_5", parameters: {}});
	$("li[code]").each(function(){
		var me = $(this);
		var sel = me.find("input[code='sel']:checked");
		if(sel.length > 0) {
			//arrSql.push({sqlID:"wx_cart_6", parameters: {id: sel.val()}});
			goods.push(sel.val());
		}
	});
	if(goods.length > 0) {
		window.location.href = basePath + '/p100074.html?type=gwc&goods_ids='+goods;
		
	}else{
		$.jqconfirm("内容", null, test);
	}
	/*if(arrSql.length > 1) {
		if(AjaxUtil.command.isSucceed(AjaxUtil.command.executeTransaction(arrSql))) {
			window.location.href = basePath + '/p100074.html';
		}
	} else {
		$.jqconfirm("内容", null, test);
	}*/
}

function test() {
	alert("请选择商品");
}

function selectAll(){
	var flag = $("#controlAll:checked").length > 0 ? 1 : 0;
	$("input[code='sel']").each(function() {
		this.checked = flag;
	});
	statistics();
}

function selectOne(){
	var flag = $("input[code='sel']").length == $("input[code='sel']:checked").length ? 1 : 0;
	$("#controlAll")[0].checked = flag;
	statistics();
}