<!doctype html>
<html>
	<head>
		<title>支付 - 希可尔图书</title>
		<#include "../controls/header.ftl">
        <script language="javascript">
        /*
        $(document).ready(function(e) {
        	setTimeout("callpay()", 3000);
		});
		*/
		
		document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
			callpay();
		});
		
		function callpay(){
			WeixinJSBridge.invoke('getBrandWCPayRequest',{
				"appId" : "${model.pay.appId}",
				"timeStamp" : "${model.pay.timeStamp}",
				"nonceStr" : "${model.pay.nonceStr}",
				"package" : "${model.pay.package}",
				"signType" : "${model.pay.signType}", 
				"paySign" : "${model.pay.paySign}" 
			},function(res){
				WeixinJSBridge.log(res.err_msg);
				if(res.err_msg == "get_brand_wcpay_request:ok"){
				    alert("微信支付成功");
				}else if(res.err_msg == "get_brand_wcpay_request:cancel"){
				    alert("用户取消支付");
				}else{
				    alert("支付失败");
				}
			})
		}
		
		/*
		document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
		    WeixinJSBridge.call('hideToolbar');
		    WeixinJSBridge.call('hideOptionMenu');
	    });
		*/
		</script>
    </head>
    <body>
	    <!--头部-->
		<div class="header">
		    <a href="${model._contextPath}/p100039.html" class="tbr_rbtn" data-icon="&#xe62a;" title="返回首页" style="width:auto">支付订单</a>
		</div>
		<!--头部 end-->
	</body>
</html>
