package org.xtframe.weixin.service.impl;

import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.xtframe.entity.Application;
import org.xtframe.entity.ApplicationConfig;
import org.xtframe.entity.User;
import org.xtframe.servlet.ActiveUserListener;
import org.xtframe.util.ApplicationConfigUtil;
import org.xtframe.util.ContextUtil;

public class LoginServiceImpl {

	public static boolean exec(String wx_openid) {
		User user = ContextUtil.getCurrentUser();
		if (user == null) {
			HttpSession session = ServletActionContext.getRequest().getSession();
			Application application = ContextUtil.getApplication();
			
			user = new User(application);
			if (user.init(wx_openid)) {
				session.removeAttribute(ApplicationConfig.LOGIN_USER);
				if ("no".equals(ApplicationConfigUtil.getApplicationConfig().getConfig("ableSameUser")))
					ActiveUserListener.SameUserOut(user.getUserInfo().getUserId());

				session.setAttribute(ApplicationConfig.LOGIN_USER, user);
				return true;
			} else {
				session.setAttribute("wx_openid", wx_openid);
			}
		}
		return false;
	}
}
