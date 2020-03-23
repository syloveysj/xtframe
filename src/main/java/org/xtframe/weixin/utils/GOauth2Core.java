package org.xtframe.weixin.utils;

import org.xtframe.util.ApplicationConfigUtil;

import net.sf.json.JSONObject;

/**
 * @ClassName: GOauth2Core
 * @Description: Oauth2类 
 * @author yong.sun
 * @date 2015-9-17
 */
public class GOauth2Core {
	public String GET_CODE = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
	public String REDIRECT_URI = "http://book.wangbig.com/server/certification.do?go=GOURL";
	
	/**
	 * 企业获取code地址处理
	 * @param appid 企业的CorpID
	 * @param redirect_uri 授权后重定向的回调链接地址，请使用urlencode对链接进行处理
	 * @param response_type 返回类型，此时固定为：code
	 * @param scope 应用授权作用域，此时固定为：snsapi_base
	 * @param state 重定向后会带上state参数，企业可以填写a-zA-Z0-9的参数值
	 * @param #wechat_redirect 微信终端使用此参数判断是否需要带上身份信息
	 * 员工点击后，页面将跳转至 redirect_uri/?code=CODE&state=STATE，企业可根据code参数获得员工的userid
	 * */
	public String GetCode(String goUrl){
		String get_code_url = "";
		get_code_url = GET_CODE.replace("APPID", ApplicationConfigUtil.getApplicationConfig().getConfig("weixinAppId")).replace("REDIRECT_URI", WeixinUtil.URLEncoder(REDIRECT_URI.replace("GOURL", WeixinUtil.URLEncoder(goUrl))));
		return get_code_url;
	}
	
	public String CODE_TO_USERINFO = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=APPSECRET&code=CODE&grant_type=authorization_code";
	
	/**
	 * 根据code获取成员信息
	 * @param code 通过员工授权获取到的code，每次员工授权带上的code将不一样，code只能使用一次，5分钟未被使用自动过
	 * */
	public String GetUserID(String code){
		String UserId = "";
		CODE_TO_USERINFO = CODE_TO_USERINFO.replace("APPID", ApplicationConfigUtil.getApplicationConfig().getConfig("weixinAppId")).replace("APPSECRET", ApplicationConfigUtil.getApplicationConfig().getConfig("weixinAppSecret")).replace("CODE", code);
		JSONObject jsonobject = WeixinUtil.httpRequest(CODE_TO_USERINFO, "GET", null);
		if(null!=jsonobject){
			UserId = jsonobject.getString("openid");
			if(!"".equals(UserId)){
				System.out.println("获取信息成功，o(∩_∩)o ————UserID:"+UserId);
			}else{
				int errorrcode = jsonobject.getInt("errcode");  
	            String errmsg = jsonobject.getString("errmsg");
	            System.out.println("错误码："+errorrcode+"————"+"错误信息："+errmsg);
			}
		}else{
			System.out.println("获取授权失败了，●﹏●，自己找原因。。。");
		}
		return UserId;
	}

}
