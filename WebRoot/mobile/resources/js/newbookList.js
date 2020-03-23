var totalpage =0;
var cpage = 0;
var next = 0;
var goods_id=0;
var totalcount=0;
var start=0;
var pageSize=0;
var contextPath;
var upflag=false;
$(document).ready(function(e) {
	$('#myfavour').click(function(){
		collectAuthor();
	});
	
	initPage();//页面分页初始化--分页参数-变量计算设置
});

function collectAuthor() {
	if(AjaxUtil.command.isSucceed(AjaxUtil.command.executeUpdate("wx_author_collect_2", {author_id:$("#id").val()}))) {
		alert("已收藏");
	}
}

//页面分页初始化--分页参数-变量计算设置
function initPage(){
	totalcount =$("#totalcount").val()*1;   //总条数
	start =$("#start").val()*1;				//开始条数
	pageSize = 6;							//每页查询条数
	contextPath = $("#contextPath").val();
	totalpage= (totalcount<=pageSize)?1:(totalcount%pageSize==0?totalcount/pageSize: parseInt(totalcount/pageSize+1)); //总页数
	cpage = start<pageSize ? 1 : parseInt(start/pageSize+1); //当前页数
	next =  (totalcount <= start+pageSize) ? start : start+pageSize;//下一页
	if(cpage==totalpage){ //判断当前页是否是最后一页
		upflag=true;
		document.getElementById('pullUp').querySelector('.pullUpLabel').innerHTML = '无更多书籍'; 
	}else{
		document.getElementById('pullUp').querySelector('.pullUpLabel').innerHTML = '上拉刷新更多书籍...';
	}
	pagePullWidth();
}


var myScroll, 
	pullUpEl, 
	pullUpOffset,
	generatedCount = 0;
function pullUpAction () {  //自定义执行数据查询方法
	setTimeout(function () {
		start=next;  //开始记录数=下一页记录开始数
		pageSize = 5; 
		var data = AjaxUtil.command.executeQuery("wx_newbook_1",{start:next,size:pageSize}); //查询书籍
		for(var i=0;i<data.rows.length;i++){
			var row = data.rows[i];
//			var goods_id =  row.goods_id;
//			var small_relative_path =  row.small_relative_path;
			var goods_name =   row.goods_name;
			var goods_price =  row.goods_price;
			var goods_author =  row.goods_author;
			var goods_factory =  row.goods_factory;
			if(goods_author != '' && goods_author != null && goods_author != undefined ){
			}else{
				goods_author = '未知';
			}
			if(goods_factory != '' && goods_factory != null && goods_factory != undefined ){
			}else{
				goods_factory = '未知';
			}
			if(goods_name.length > 16 ){
				goods_name = goods_name.substring(0,16);
				goods_name +='..';
			}
			if(goods_price != '' && goods_price != null && goods_price != undefined){
			}else{
				goods_price = '0';
			}
			$("#thelist").append(
					'<li style="height:auto">' +
					'<a href="'+contextPath+'/p100050.html?id='+row.goods_id+'">' +
					'<img src="'+contextPath+row.small_relative_path+'" style="border-radius:0"'+ 
					'<div class="txtall">'+
					'<h4 class="titleblue">'+goods_name+'</h4>'+
					'<p class="price">￥'+goods_price+'</p>'+
					'<p class="poortxt">'+
					''+goods_author+' 著.'+
					''+goods_factory+' 出版.'+
					'</p></div></a></li>'); // 页面ui元素追加子元素li
		}
		totalpage= totalcount<=pageSize?1:(totalcount%pageSize==0?totalcount/pageSize: parseInt(totalcount/pageSize+1)); 
		cpage = start<pageSize ? 1 : parseInt(start/pageSize+1);
		next =  (totalcount*1 <= (start*1+pageSize*1)) ? start : (start*1+pageSize*1);
		if(cpage==totalpage){
			upflag=true;
			document.getElementById('pullUp').querySelector('.pullUpLabel').innerHTML = '无更多书籍';
		}else{
			document.getElementById('pullUp').querySelector('.pullUpLabel').innerHTML = '上拉刷新更多书籍...';
		}
		myScroll.refresh(); //控件刷新。
		pagePullWidth();
	}, 0);
}



function loaded() {
	pullUpEl = document.getElementById('pullUp');	
	pullUpOffset = 10;
	myScroll = new iScroll('wrapper', {
		useTransition: true,
		onRefresh: function () { //控件刷新
			if (pullUpEl.className.match('loading')) { 
				pullUpEl.className = '';
			}
			//document.getElementById("pullUp").style.display="none";
		},
		onScrollMove: function () {//滚动事件
			if ( this.scrollerH < this.wrapperH && this.y < (this.minScrollY-pullUpOffset) || this.scrollerH > this.wrapperH && this.y < (this.maxScrollY - pullUpOffset) ) {
				document.getElementById("pullUp").style.display="";
				pullUpEl.className = 'flip';
			} 
			 if (this.scrollerH < this.wrapperH && this.y > (this.minScrollY-pullUpOffset) && pullUpEl.className.match('flip') || this.scrollerH > this.wrapperH && this.y > (this.maxScrollY - pullUpOffset) && pullUpEl.className.match('flip')) {
				document.getElementById("pullUp").style.display="none";
				pullUpEl.className = '';
			}
		},
		onScrollEnd: function () { //滚动结束事件
			 if (pullUpEl.className.match('flip')) {
				if(upflag){ }else{ 
					pullUpEl.className = 'loading';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '读取中...';		
					pullUpAction();	//自定义执行方法(数据查询--书籍数据查询)
				}
			}
		}
	});
}
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);  //document html上下文添加监控--触摸监控
document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);//document html上下文添加监控-



function substrDemo(sstr,sln,eln){//字符过长截取方法 sln 开始截取下标 -- eln结束下标 
	   var ss="";               
	   var s = sstr;
	   if(s&&s!=""&&s.length>0){
		   if(s.length>eln){
			   ss = s.substr(sln, eln+1)+"..."; 
		   }else{
			   ss = s;
		   }
	   }
	   return(ss);
}

function pagePullWidth(){
	var pullUpIconw=$("#pullUpIcon").width();
	var pullUpLabelw=$("#pullUpLabel").width();
	$("#pullUpIcon").css("margin-left",($(window).width()-pullUpIconw-pullUpLabelw)/2+"px");
}