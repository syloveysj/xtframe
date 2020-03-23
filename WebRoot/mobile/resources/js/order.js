
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
	var conHeigth=$(window).height()-$("#shaed").height();
	$("#wrapper").height(conHeigth-55);
	initPage();//页面分页初始化--分页参数-变量计算设置
});
//页面分页初始化--分页参数-变量计算设置
function initPage(){
	totalcount =$("#totalcount").val()*1;   //总条数
	start =$("#start").val()*1;				//开始条数
	pageSize = 4;							//每页查询条数
	contextPath = $("#contextPath").val();
	totalpage= (totalcount<=pageSize)?1:(totalcount%pageSize==0?totalcount/pageSize: parseInt(totalcount/pageSize+1)); //总页数
	cpage = start<pageSize ? 1 : parseInt(start/pageSize+1); //当前页数
	next =  (totalcount <= start+pageSize) ? start : start+pageSize;//下一页
	if(cpage==totalpage){ //判断当前页是否是最后一页
		upflag=true;
		document.getElementById('pullUp').querySelector('.pullUpLabel').innerHTML = '无更多订单'; 
	}else{
		document.getElementById('pullUp').querySelector('.pullUpLabel').innerHTML = '上拉刷新更多订单...';
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
	pageSize = 4; 
	var data=AjaxUtil.command.custom("orderManagerPageHandler",{start:next,size:pageSize});
	if(AjaxUtil.command.isSucceed(data)){
		var info=$.evalJSON($.toJSON(data));
		for(var i=0;i<data.rows.length;i++){
			var row = data.rows[i];
			var detailsRow = row.order_details;
			var str="   <div id='thelist' class='htls'> <div class='page_list' id='div4'><div class='odtitle'><h4>订单号："+row.orders_id+"<span>￥"+row.total_price+"</span></h4></div>"
		    			+"<div class='list'>"
		    			+"<ul>";
						for(var k=0;k<detailsRow.length;k++){
							var details=detailsRow[k];
							str+="<li>"
				    			+"<a href='/p100050.html?id="+details.goods_id+"'>"
					  			+"<div class='img_wrap'><img src="+details.small_relative_path+" width='80'></div>"
								+"<div class='text_wrap'>" 
								+"<p class='name'>"+details.goods_name+"</p>"
								+"<p class='promo'>"+details.goods_factory+" 出版. </p>"
								+"<p class='price'><span class='feed'>"+details.goods_author+"著</span><span class='y_pf'>¥ "+details.goods_price+" </span></p>" 
								+"</div>"
								+"</a>"
				    			+"</li>";
						}
		        str+=	"</ul>"
		    			+"</div></div>";
			if(row.status == '1'){
				$("div[class=htls]:last").after(
						str
		    			+"<div class='mctext odcontrol'>已下单<a href='"+contextPath+"/weixin/demo/orderPay.html?id="+row.orders_id+"'>立即支付</a>"
		    			+"</div>"
				);
			}else if(row.status == '2'){
				$("div[class=htls]:last").after(
						str
		    			+"<div class='mctext odcontrol'>已支付<a href='"+contextPath+"/p100085.html?orders_id="+row.orders_id+"'>确认收货</a>"
		    			+"</div>"
				);
			}else if(row.status == '3'){
				$("div[class=htls]:last").after(
						str
		    			+"<div class='mctext odcontrol'>已支付<a href='"+contextPath+"/p100085.html?orders_id="+row.orders_id+"'>确认收货</a>"
		    			+"</div>"
				);
    		}else if(row.status == '4'){
    			var addStr = "";
    			if(row.kddh != null && row.kddh != undefined && row.kdbh != null && row.kdbh != undefined){
    				addStr = '<a href="http://m.kuaidi100.com/index_all.html?type='+row.kdbh+'&postid='+row.kddh+'&callbackurl=http://book.wangbig.com/p100069.html">查看物流</a>';
    			}
    			$("div[class=htls]:last").after(
						str
		    			+"<div class='mctext odcontrol'>已完成"+addStr+""
		    			+"</div>"
				);
    		}
		}
	}
	totalpage= totalcount<=pageSize?1:(totalcount%pageSize==0?totalcount/pageSize: parseInt(totalcount/pageSize+1)); 
	cpage = start<pageSize ? 1 : parseInt(start/pageSize+1);
	next =  (totalcount <= (start+pageSize)) ? start : (start+pageSize);
	if(cpage==totalpage){
		upflag=true;
		document.getElementById('pullUp').querySelector('.pullUpLabel').innerHTML = '无更多订单';
	}else{
		document.getElementById('pullUp').querySelector('.pullUpLabel').innerHTML = '上拉刷新更多订单...';
	}
	myScroll.refresh(); //控件刷新。
	pagePullWidth();
}, 0);
}


function loaded() {  // 下拉刷新方法
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
	   var s="", ss="";               
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