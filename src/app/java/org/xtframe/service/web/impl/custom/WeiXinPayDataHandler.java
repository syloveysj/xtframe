package org.xtframe.service.web.impl.custom;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.SortedMap;
import java.util.TreeMap;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.ServletActionContext;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.xtframe.common.URLConnectionHelper;
import org.xtframe.entity.ApplicationConfig;
import org.xtframe.entity.User;
import org.xtframe.entity.WebPageDefined;
import org.xtframe.service.web.IWebDataHandler;
import org.xtframe.util.ApplicationConfigUtil;
import org.xtframe.util.CommonUtil;
import org.xtframe.util.ContextUtil;
import org.xtframe.weixin.common.MD5Util;

/**
 * @ClassName: WeiXinPayDataHandler 
 * @Description: 微信支付数据生成处理
 * @author yong.sun
 * @date 2013-11-1
 */
public class WeiXinPayDataHandler implements IWebDataHandler {
	private final Log logger = LogFactory.getLog(getClass());
	private String charset = "UTF-8";
	private String key;
	
	public Object execute(Map<String, Object> parame, Map<String, Object> data, WebPageDefined wpd) {
		try {
			User user = ContextUtil.getCurrentUser();
//			Application application = ContextUtil.getApplication();
			HttpServletRequest request = ServletActionContext.getRequest();
			String basePath = request.getScheme()+"://"+request.getServerName()+request.getContextPath();
			ApplicationConfig applicationConfig = ApplicationConfigUtil.getApplicationConfig();
			key = applicationConfig.getConfig("weixinKey");
			String nonceStr = CommonUtil.getUUID().toLowerCase();
			
			//设置package订单参数
			SortedMap<String, String> packageParams = new TreeMap<String, String>();
			packageParams.put("appid", applicationConfig.getConfig("weixinAppId"));		//公众帐号ID
			packageParams.put("body", "测试贡献一分");										//商品描述   
			packageParams.put("mch_id", applicationConfig.getConfig("weixinMchId"));	//商户号
			packageParams.put("nonce_str", nonceStr);									//随机字符串
			packageParams.put("notify_url", basePath + "/weixin/demo/payNotice.html");	//接收财付通通知的URL
			packageParams.put("openid", user.getUserInfo().getUserId());				//openid
			packageParams.put("out_trade_no", "20141115");								//商户订单号  
			packageParams.put("spbill_create_ip", CommonUtil.getIpAddr(request));		//订单生成的机器IP，指用户浏览器端IP(用户的公网IP)
			packageParams.put("total_fee", "1");										//商品总金额,以分为单位
			packageParams.put("trade_type", "JSAPI");									//交易类型
			
			Map<String, String> map = new HashMap<String, String>();
			map.put("appId", applicationConfig.getConfig("weixinAppId"));				//公众号id
			map.put("timeStamp", "" + (System.currentTimeMillis() / 1000));				//时间戳
			map.put("nonceStr", nonceStr);												//随机字符串
			map.put("package", genPackage(packageParams));								//订单详情扩展字符串
			map.put("signType", "MD5");													//签名方式
			
			packageParams.clear();
			packageParams.put("appId", map.get("appId"));
			packageParams.put("timeStamp", map.get("timeStamp"));
			packageParams.put("nonceStr", map.get("nonceStr"));
			packageParams.put("package", map.get("package"));
			packageParams.put("signType", map.get("signType"));
			map.put("paySign", createSign(packageParams));								//签名
			
			return map;
		} catch (Exception e) {
			logger.error(e.toString());
		}
		
		return null;
	}
	
	// 特殊字符处理  
    public String UrlEncode(String src) throws UnsupportedEncodingException {
        return URLEncoder.encode(src, this.charset).replace("+", "%20");
    }
	
	// 获取package的签名包  
	public String genPackage(SortedMap<String, String> packageParams) throws UnsupportedEncodingException {
        String sign = createSign(packageParams);
        return genPackage(packageParams, sign);
    }
    
	// 获取package的签名包  
	public String genPackage(SortedMap<String, String> packageParams, String sign) throws UnsupportedEncodingException {
    	packageParams.put("sign", sign);
    	String params = parseXML(packageParams);
    	System.out.println("xml=" + params);
    	String result = URLConnectionHelper.sendPost("https://api.mch.weixin.qq.com/pay/unifiedorder", params);
    	System.out.println("result=" + result);
    	Document doc = null;
    	String prepay_id = null;
    	try{
    		doc = DocumentHelper.parseText(result); // 将字符串转为XML
    		Element rootElt = doc.getRootElement(); // 获取根节点
    		prepay_id = rootElt.elementTextTrim("prepay_id"); // 拿到根节点下的子节点prepay_id值
    	} catch (DocumentException e) {
    	//	e.printStackTrace();
    	} catch (Exception e) {
		//	e.printStackTrace();
		}
        System.out.println("prepay_id=" + prepay_id);
        return "prepay_id=" + prepay_id;
    }
    
    /** 
     * 创建md5摘要,规则是:按参数名称a-z排序,遇到空值的参数不参加签名。 
     */  
    @SuppressWarnings("rawtypes")
	public String createSign(SortedMap<String, String> packageParams) {
        StringBuffer sb = new StringBuffer();
        Set es = packageParams.entrySet();
        Iterator it = es.iterator();
        while (it.hasNext()) {
            Map.Entry entry = (Map.Entry) it.next();
            String k = (String) entry.getKey();
            String v = (String) entry.getValue();
            if (null != v && !"".equals(v) && !"sign".equals(k) && !"key".equals(k)) {
                sb.append(k + "=" + v + "&");
            }
        }
        sb.append("key=" + this.key);
        System.out.println("md5 sb:" + sb);
        String sign = MD5Util.MD5Encode(sb.toString(), this.charset).toUpperCase();
        return sign;
    }
    
	//输出XML  
	@SuppressWarnings("rawtypes")
	public String parseXML(SortedMap<String, String> packageParams) {  
		StringBuffer sb = new StringBuffer();  
		sb.append("<xml>");  
		Set es = packageParams.entrySet();  
		Iterator it = es.iterator();  
		while(it.hasNext()) {  
	    	Map.Entry entry = (Map.Entry)it.next();  
	         String k = (String)entry.getKey();  
	         String v = (String)entry.getValue();  
	         if(null != v && !"".equals(v)) {
	        	 sb.append("<" + k +"><![CDATA[" + v + "]]></" + k + ">\n");  
	         }  
		}  
		sb.append("</xml>");  
		return sb.toString();  
	}
}
