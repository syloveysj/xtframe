package org.xtframe.weixin.action;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.ServletActionContext;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Repository;
import org.xtframe.weixin.service.CoreService;
import org.xtframe.weixin.utils.SignUtil;

/**
 * @ClassName: WeixinDataServerAction 
 * @Description: 微信公众平台数据接收处理Action
 * @author yong.sun
 * @date 2014-7-2
 */
@Repository("/weixinDataServerAction")
@Scope("prototype")
public class WeixinDataServerAction {

	private final Log logger = LogFactory.getLog(getClass());
    
	public String execute() {
		HttpServletRequest request = ServletActionContext.getRequest();
		String method = request.getMethod();
		if(method.equals("GET")) {
			// 微信加密签名
	        String signature = request.getParameter("signature");
	        // 随机字符串
	        String echostr = request.getParameter("echostr");
	        // 时间戳
	        String timestamp = request.getParameter("timestamp");
	        // 随机数
	        String nonce = request.getParameter("nonce");
	        
	        // 确认请求来至微信
	        if (SignUtil.checkSignature(signature, timestamp, nonce)) {
	        	sendMsg(echostr);
	        }
		} else {
			String msg = CoreService.processRequest(request);
			sendMsg(msg);
		}
        return null;
	}
	
	private void sendMsg(String msg) {
		try {
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType("text/html;charset=UTF-8");
			response.setHeader("Pragma", "No-cache");
			response.setHeader("Cache-Control", "no-cache");
			response.setDateHeader("Expires", 0);
			response.getWriter().write(msg);
			response.getWriter().flush();
		} catch (IOException e) {
			logger.error(e.toString());
		}
	}
}

