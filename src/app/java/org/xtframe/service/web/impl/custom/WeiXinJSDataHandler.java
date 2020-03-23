package org.xtframe.service.web.impl.custom;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.xtframe.common.URLConnectionHelper;
import org.xtframe.common.json.JSON2Java;
import org.xtframe.dao.DataBaseFactory;
import org.xtframe.dao.IDataBase;
import org.xtframe.entity.ApplicationConfig;
import org.xtframe.service.AbstractBasicExecute;
import org.xtframe.service.ajax.IAjaxDataHandler;
import org.xtframe.util.ApplicationConfigUtil;
import org.xtframe.util.CommonUtil;
import org.xtframe.util.StringUtil;
@Service
@Scope("prototype")
public class WeiXinJSDataHandler extends AbstractBasicExecute implements IAjaxDataHandler{
	private final Log logger = LogFactory.getLog(getClass());
	private String charset = "UTF-8";
	
	public Map<String, Object> execute(String strData) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			Map<String, Object> objJson = JSON2Java.optMap(CommonUtil.getJavaObject(strData));
			Map<String, Object> parameters = JSON2Java.optMap(objJson.get("parameters"));
			String pageUrl = StringUtil.toString(parameters.get("pageUrl"), "");
			
			ApplicationConfig applicationConfig = ApplicationConfigUtil.getApplicationConfig();
			
			String nonceStr = CommonUtil.getUUID().toLowerCase(); 				//--随机字符串
			long timeStamp=System.currentTimeMillis() / 1000;					//--当前时间秒数
			String appId=applicationConfig.getConfig("weixinAppId");			//--公众帐号appId
			String appSecret=applicationConfig.getConfig("weixinAppSecret");			//--公众帐号appSecret
			
			String access_token = "";
			String jsapi_ticket = "";
			
			String access_token_josn=getAccess_token(appId,appSecret);
			Object list = CommonUtil.getJavaObject(access_token_josn);
			Map<String, Object> access_tokenMap = JSON2Java.optMap(list);
			access_token = access_tokenMap.get("access_token").toString();
			
			String ticket_josn = getticket(access_token);
			Object list1 = CommonUtil.getJavaObject(ticket_josn);
			Map<String, Object> ticketMap = JSON2Java.optMap(list1);
			jsapi_ticket = ticketMap.get("ticket").toString();
			
			map.put("appId", appId);				//公众号id
			map.put("timeStamp", "" + timeStamp);				//时间戳
			map.put("nonceStr", nonceStr);												//随机字符串
			map.put("accesstoken", access_token);	
			
			System.out.println("weixinAppId="+appId);
			System.out.println("timeStamp="+(System.currentTimeMillis() / 1000));
			System.out.println("nonceStr="+nonceStr);
			System.out.println("accesstoken="+access_token);
			System.out.println("jsapi_ticket="+jsapi_ticket);
			
			map.put("jsSign", createSign("jsapi_ticket="+jsapi_ticket+"&noncestr="+nonceStr+"&timestamp="+timeStamp+"&url="+pageUrl+""));								//签名
			System.out.println("jsSign_ss="+"jsapi_ticket="+jsapi_ticket+"&noncestr="+nonceStr+"&timestamp="+timeStamp+"&url="+pageUrl+"");
			map.put(STATUS, true);
		} catch (Exception e) {
			logger.error(e.toString());
			map.clear();
			map.put(STATUS, false);
		}
		return map;
	}
	
	// 特殊字符处理  
    public String UrlEncode(String src) throws UnsupportedEncodingException {
        return URLEncoder.encode(src, this.charset).replace("+", "%20");
    }
	
	public String getAccess_token(String appId,String appSecret) throws UnsupportedEncodingException {
    	String url="https://api.weixin.qq.com/cgi-bin/token";
    	String params="grant_type=client_credential&appid="+appId+"&secret="+appSecret;
    	String result = URLConnectionHelper.sendGet(url, params);
        return result;
    }
	public String getticket(String access_token) throws UnsupportedEncodingException {
    	String url="https://api.weixin.qq.com/cgi-bin/ticket/getticket";
    	String params="access_token="+access_token+"&type=jsapi";
    	String result = URLConnectionHelper.sendGet(url, params);
        return result;
    }
	
    /** 
     * 创建md5摘要,规则是:按参数名称a-z排序,遇到空值的参数不参加签名。 
     */  
	public String createSign(String sb) {
    		MessageDigest md = null;  
            String tmpStr = null;  
            try {  
                md = MessageDigest.getInstance("SHA-1");  
                // 将三个参数字符串拼接成一个字符串进行sha1加密  
                byte[] digest = md.digest(sb.toString().getBytes());  
                tmpStr = byteToStr(digest);  
                System.out.println(tmpStr);
                return tmpStr;
            } catch (NoSuchAlgorithmException e) {  
                e.printStackTrace();  

            }  
        return "";
    }
    
	private static String byteToStr(byte[] byteArray) {  
        String strDigest = "";  
        for (int i = 0; i < byteArray.length; i++) {  
            strDigest += byteToHexStr(byteArray[i]);  
        }  
        return strDigest;  

    }  
	 private static String byteToHexStr(byte mByte) {  
	        char[] Digit = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' };  
	        char[] tempArr = new char[2];  
	        tempArr[0] = Digit[(mByte >>> 4) & 0X0F];  
	        tempArr[1] = Digit[mByte & 0X0F];  
	        String s = new String(tempArr);  
	        return s;  
	    }
}
