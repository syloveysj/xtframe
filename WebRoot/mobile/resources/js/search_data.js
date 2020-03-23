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
	var data = AjaxUtil.command.custom("searchdatasolrDataHandler",{goods_name:$('#book').val(),start:next,size:pageSize});
	for(var i=0;i<data.rows.length;i++){
		var row = data.rows[i];
		$("#thelist").append(
				"<li>"+
					"<a href='"+contextPath+"/p100050.html?id="+row.goods_id+"'>  "+
					  	"<div class='img_wrap'><img src='"+contextPath+row.small_relative_path+"' width='80'></div>"+
						"<div class='text_wrap'> "+
							"<p class='name'>"+row.goods_name+"</p>"+
							"<p class='price'>"+row.goods_author+" 著</p>"+
							"<p class='price'><span class='feed'> "+row.goods_factory+"出版.</span></p> "+ 
						"</div>"+
					"</a>"+
				"</li>"
		);			
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