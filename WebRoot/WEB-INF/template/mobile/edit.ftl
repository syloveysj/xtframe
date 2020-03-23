<!DOCTYPE html>
<html>
	<head>
		<title>编辑资料 - 希可尔图书</title>
		<#include "controls/header.ftl"> 
		<script type="text/javascript" src="${model._contextPath}/mobile/resources/js/search.js"></script>
		<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
		<script type="text/javascript" src="${model._contextPath}/web/js/plugin/ajaxutil.js"></script>
<script>
	var images ;
	var appId;
	var timeStamp;
	var nonceStr;
	var jsSign;
	var accesstoken;
	var imaSerId='';
	
    $(document).ready(function(){
    		var jcsex=$("#jc_sex").val();
    		if(jcsex==""){
    			jcsex="男";
    		}
    		$("input:radio[value='"+jcsex+"']").attr('checked','true');
    		var pageUrl=location.href.split('#')[0];
    		var data=AjaxUtil.command.custom("weiXinJSDataHandler",{pageUrl:pageUrl});
    		if(AjaxUtil.command.isSucceed(data)){
    			var info=$.evalJSON($.toJSON(data)); 
    			appId = info.appId;
    			timeStamp = info.timeStamp;
    			nonceStr = info.nonceStr;
    			jsSign = info.jsSign;
    			accesstoken = info.accesstoken;
    		}
    		images = {
            	localId: [],
            	serverId: [],
            	downloadId: []
    		};	
    
    		wx.config({
		        debug: false,
		        appId: appId,
		        timestamp: timeStamp,
		        nonceStr: nonceStr,
		        signature: jsSign,
		        jsApiList: ['chooseImage','uploadImage']
		    });
		    
		    $('#save').click(function(){
		    	save();
		    });
	});
	wx.ready(function(){
		
	});	
	
	
	
	function chooseImage(){
		wx.chooseImage({
			success: function (res) {
				if(res.localIds.length>1){
					alert("请选择一张图片作为头像");
				}else{
					images.localId = res.localIds;
					uploadImage();
				}
			}
		});
	}
	function uploadImage(){
		var n=images.localId[0];
		wx.uploadImage({
			localId: n,
            success: function (res) {
           		$("#userImage").attr('src',n);
            	imaSerId=res.serverId;
            }
		});
	}
		
		
		function save(){
			var username = $("#username").val();
			var qq = $("#qq").val();
			var email = $("#email").val();
			var textarea=$("#textarea").val();
			var sex=$("input[name='sex']:checked").val();
			var data=AjaxUtil.command.custom("weiXinImageDownloadHandler",{username:username,sex:sex,qq:qq,email:email,textarea:textarea,imaSerId:imaSerId,accesstoken:accesstoken});
			if(AjaxUtil.command.isSucceed(data)){
				var info=$.evalJSON($.toJSON(data));
				alert("保存成功");
			}else{
				alert("保存失败");
			}
		}
	
		</script>
		
	</head>
	<body id="totop" >
		<!--头部-->
		<div class="header">
			<a href="javascript:window.history.back();" class="tbr_rbtn" data-icon="&#xe62a;" title="返回" style="width:auto">编辑资料</a>
			<a href="javascript:void(0);" class="tbr_rbtn" data-icon="&#xe633;" title="搜索" style="right:120px;" id="mySwitch"></a>
			<a href="${model._contextPath}/index.html" class="tbr_rbtn" data-icon="&#xe612;" title="首页" style="right:80px;"></a>
			<a href="${model._contextPath}/p100067.html" class="tbr_rbtn" data-icon="&#xe631;" title="个人中心" style="right:40px; font-size:0.85em"></a>
			<a href="${model._contextPath}/p100047.html" class="tbr_rbtn" data-icon="&#xe62f;" title="购物车" style="right:0;"><img src="${model._contextPath}/mobile/resources/img/point.png"></a>
		</div>
		<!--头部 end-->
		
		
		
		<#include "controls/header_search.ftl">
		<div class=" mycontainer">
			<div class="contactus">
		    	<form method="post" action="#">
		     		 <div class="toux">
		      			<a href="javascript:chooseImage()"><i data-icon="&#xe60d;"></i><img alt="头像" id="userImage" src="${(model.user.get(0).photo)?default('')} "></a>
		      		</div>
		      		<p style="width:90%; margin:0 auto">
		       		<input name="username" type="text" id="username" placeholder="昵称" maxlength="6" value="${(model.user.get(0).nickname)?default('')}">
		      		</p>
		      		<input type="hidden" value='${(model.user.get(0).sex)?default('')}' id="jc_sex">
		      		<p style="width:90%; margin:0 auto; overflow:hidden">
		          	  	<font class="fl" style="padding-left:1%;">性别</font>   
		              	<label style="float:right">
		             	<input type="radio"  value="女" id="sex1" name="sex" />
		              	女</label>    
		              	<label style="float:right; margin-right:1em">
		                <input type="radio"  value="男" id="sex0" name="sex" />
		             	 男</label>
		      		</p>
		      		<p style="width:90%; margin:0 auto">
		        		<input type="text" id="qq" placeholder="QQ" maxlength="20" value="${(model.user.get(0).qq)?default('')}">
		      		</p>
		           
		      		<p style="width:90%; margin:0 auto">
		        		<input type="email" id="email" placeholder="E-mail" maxlength="20" value="${(model.user.get(0).email)?default('')}">
		     		 </p>
		           
		      		<p style="width:90%; margin:0 auto">
		        		 <textarea name="textarea" id="textarea" placeholder="个人签名">${(model.user.get(0).remark)?default('')}</textarea>
		         		<input type="button" class="release_btn" value="确认修改" id="save"/>
		      		</p>
		      		
		       </form>
			</div>
		</div>
		<script>
			var contextPath = "${model._contextPath}";
		</script>
		
	</body>   
</html>