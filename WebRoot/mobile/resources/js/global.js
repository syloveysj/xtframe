$(document).ready(function(){
	if($("#back-to-top").length>0){
		$("#back-to-top").hide();
		$(window).scroll(function(){
			if ($(window).scrollTop()>100){
				$("#back-to-top").fadeIn(1500);
			} else {
				$("#back-to-top").fadeOut(1500);
			}
		});
	
		$("#back-to-top").click(function(){
			$('body,html').animate({scrollTop:0},1000);
			return false;
		});
	}
	
	if($("#myfavour").length>0){
		shake($("#myfavour"),"favourcss",4);
/*
		$("#myfavour").bind({
			click:function(){
				shake($(this),"favourcss",1);
				return false;
			}
		});
*/
	}
});


function shake(ele,cls,times){
	var i = 0, t = false, o = ele.attr("class")+" ", c = "", times = times||2;
	if(t) return;
	t= setInterval(function(){
		i++;
		c = i%2 ? o+cls : o;
		ele.attr("class",c);
		
		if(i==2*times){
			clearInterval(t);
			ele.removeClass(cls);
		}
	},200);
};

