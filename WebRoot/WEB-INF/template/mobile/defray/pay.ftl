<!doctype html>
<html>
   <head>
   		<title>支付测试 - 希可尔图书</title>
		<#include "controls/public_header.ftl">
        <script language="javascript">
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
		</script>
    </head>
    <body>
    	<a href="/p100039.html">返回首页</a><br/><br/>
    	<button type="button" onclick="callpay()" >微信支付测试</button>
	</body>
</html>
