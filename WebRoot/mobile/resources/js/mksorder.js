function goodsSubmit(){
	var goods=[];	
	$("input[code='goods']").each(function(){
		var me = $(this);
		goods.push(me.val());
	});
	var addr_id = $("#addr_id").val();
	if(addr_id == null || addr_id == "" || addr_id == undefined){
		alert('请添加收货地址!!');
		window.location.href = basePath + '/p100070.html';
		return;
	}
	var type = $("#type").val();
	//window.location.href = basePath + '/p100065.html?goods='+goods+"&addr_id="+addr_id+"&type="+type;
	window.location.href = basePath + '/p100065.html?addr_id='+addr_id+"&type="+type+"&goods="+goods;
}

function chooseAddr(){
	$("#drrs").show();
}

$(document).ready(function(e) {
	var conHeigth=$(window).height();
	var conwidth=$(window).width();
	$("#box2").height(conHeigth*0.6);
});
function getadrr(addr_id,addr_name,consignee,mobile,address,postalcode){
	$("#drrs").hide();
	$("#bg_adds").empty();
	$("#bg_adds").append(
	'<a href="javascript:chooseAddr()">'+
		'<input type="hidden" id="addr_id" value="'+addr_id+'">'+
		'<h4 data-icon="&#xe616;">&nbsp;&nbsp;&nbsp;'+addr_name+'<img width="8" alt="跳转" src="'+basePath+'/mobile/resources/img/jiao.png"></h4>'+
		'<p>电话：'+mobile+'</p>'+
		'<p>地址：'+address+'</p>'+
		'<p>邮编：'+postalcode+'</p>'+
	'</a>'
	);
}
function close(){
	$("#drrs").hide();
}
