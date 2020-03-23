package org.xtframe.weixin.action;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.ServletActionContext;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Repository;
import org.xtframe.entity.Application;
import org.xtframe.entity.ApplicationConfig;
import org.xtframe.entity.User;
import org.xtframe.servlet.ActiveUserListener;
import org.xtframe.util.ApplicationConfigUtil;
import org.xtframe.util.ContextUtil;
import org.xtframe.util.StringUtil;
import org.xtframe.weixin.utils.GOauth2Core;
import org.xtframe.weixin.utils.WeixinUtil;

/**
 * @ClassName: CertificationServerAction
 * @Description: 微信页面认证处理Action
 * @author yong.sun
 * @date 2014-7-2
 */
@Repository("/certificationServerAction")
@Scope("prototype")
public class CertificationServerAction {

	private final Log logger = LogFactory.getLog(getClass());
	
	private Map<String, Object> model;
	
	private String urlParame;
	
	private String openid;

	public String execute() throws IOException {
		HttpServletRequest request = ServletActionContext.getRequest();
		
		// 打印请求方式
		String method = request.getMethod();
		System.out.println("method = " + method + "; Url = " + request.getRequestURL());
		urlParame = "";
		try {
			String code = request.getParameter("code");
			String go = request.getParameter("go");
			if(!StringUtil.isBlank(go)) {
				urlParame = "?go=" + WeixinUtil.URLEncoder(go);
			}
			if (!"authdeny".equals(code)) {
				GOauth2Core goauth2Core = new GOauth2Core();
				openid = goauth2Core.GetUserID(code);
				System.out.println("wx_openid=" + openid);
				
				if(!StringUtil.isBlank(openid)) {
					HttpSession session = ServletActionContext.getRequest().getSession();
					Application application = ContextUtil.getApplication();
					User user = new User(application);
					if (user.init(openid)) {
						session.removeAttribute(ApplicationConfig.LOGIN_USER);
						if ("no".equals(ApplicationConfigUtil.getApplicationConfig().getConfig("ableSameUser")))
							ActiveUserListener.SameUserOut(user.getUserInfo().getUserId());
		
						session.setAttribute(ApplicationConfig.LOGIN_USER, user);
					} else {
						return "error";
					}
				} else {
					return "error";
				}
			} else {
				logger.error("Class: CertificationServerAction 授权获取失败。");
			}
			return "success";
		} catch (Exception e) {
		    e.printStackTrace();
		}
		
		// 跳转到index.jsp
		return "error";
	}

	public Map<String, Object> getModel() {
		return model;
	}

	public void setModel(Map<String, Object> model) {
		this.model = model;
	}

	public String getUrlParame() {
		return urlParame;
	}

	public void setUrlParame(String urlParame) {
		this.urlParame = urlParame;
	}

	public void setOpenid(String openid) {
		this.openid = openid;
	}

	public String getOpenid() {
		return openid;
	}
}
