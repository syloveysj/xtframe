
var totalpage =0;
var cpage = 0;
var next = 0;
var goods_id=0;
var totalcount=0;
var start=0;
var pageSize=0;
var contextPath;
$(document).ready(function(e) {
	$('#addNum').click(function(){
		var n = parseInt($('#num').val());
		if(n > 98) {
			$('#num').val(99);
		} else {
			$('#num').val(n + 1);
		}
	});
	$('#lessNum').click(function(){
		var n = parseInt($('#num').val());
		if(n < 2) {
			$('#num').val(1);
		} else {
			$('#num').val(n - 1);
		}
	});
	
	$('#rigtOrder').click(function(){
		payfor();
	});
	
	$('#myfavour').click(function(){
		collectGoods();
	});
	hpdClass();
	initPage();
});
function hpdClass(){
	var startxp=3;
	var width1=0;
	var hpdValue=$("#hpd").val()*1;
	if(hpdValue!=0){
		var hpdint=parseInt(hpdValue);
		var hpdfolat=hpdValue-hpdint;
		width1=(hpdint-1)*9+startxp+(hpdint*14);
		if(hpdfolat!=0){
			width1+=9+(hpdfolat*14);
		}
	}
	$("#wjx").width(width1);
}
function initPage(){
	goods_id= $("#goods_id").val();
	totalcount =$("#totalcount").val()*1;
	start =$("#start").val()*1;
	pageSize = $("#pageSize").val()*1;
	contextPath = $("#contextPath").val();
	totalpage= totalcount<=pageSize?1:(totalcount%pageSize==0?totalcount/pageSize: parseInt(totalcount/pageSize+1));
	cpage = start<pageSize ? 1 : parseInt(start/pageSize+1);
	next =  (totalcount <= start+pageSize) ? start : start+pageSize;
	if(cpage==totalpage){
		$("#cxpl").append("<a href='javascript:addvoid()'>没有评论</a>");
	}else{
		$("#cxpl").append("<a href='javascript:addpl("+next+","+pageSize+")'>查看更多评论</a>");
	}
}
function addvoid(){
}
function addpl(next,size){
	start=next;
	var data = AjaxUtil.command.executeQuery("wx_comment_1",{id:goods_id,start:next,size:pageSize});
	for(var i=0;i<data.rows.length;i++){
		var row = data.rows[i];
		$("#plDiv").append("<div class='sex_div'><div class='sex_tx dcsarea'><img class='fl' src='"+contextPath+row.small_relative_path+"' style='margin-right:10px'><h4>"+row.nickname+"</h4><p style='color:#888' class='huis thedate'>"+row.comment_date+"<i data-icon='&#xe601;' class='isok'></i><i data-icon='&#xe601;' class='isok'></i><i data-icon='&#xe601;' class='isok'></i><i data-icon='&#xe601;' class='isok'></i><i data-icon='&#xe601;'></i></p><div class='dcstxt'><p>"+row.comment_contant+"</p></div></div> </div>");
	}
	totalpage= totalcount<=pageSize?1:(totalcount%pageSize==0?totalcount/pageSize: parseInt(totalcount/pageSize+1));
	cpage = start<pageSize ? 1 : parseInt(start/pageSize+1);
	next =  (totalcount <= (start*1+pageSize*1)) ? start : (start*1+pageSize*1);
	$("#cxpl").empty();
	if(cpage==totalpage){
		$("#cxpl").append("<a href='javascript:addvoid()'>没有评论</a>");
	}else{
		$("#cxpl").append("<a href='javascript:addpl("+next+","+pageSize+")'>查看更多评论</a>");
	}
}


function payfor() {
	//$('#bk_num').val($('#num').val());
	//$('#js-payfor-form').submit();
	var goods_ids = $("#id").val();
	var num = $('#num').val();
	window.location.href = basePath + '/p100074.html?type=sp&goods_ids='+goods_ids+'&num='+num;
}

function addCart3() {
	if(AjaxUtil.command.isSucceed(AjaxUtil.command.executeUpdate("wx_goods_2", {goods_id:$("#id").val(), num:$('#num').val()}))) {
		alert("已加入购物车");
	} else {
		alert("加入购物车失败");
	}
}

function collectGoods() {
	if(AjaxUtil.command.isSucceed(AjaxUtil.command.executeUpdate("wx_goods_collect_2", {goods_id:$("#id").val()}))) {
		alert("已收藏");
	}
}


