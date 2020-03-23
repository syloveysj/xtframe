package org.xtframe.util;

import org.apache.struts2.ServletActionContext;
import org.xtframe.entity.Application;
import org.xtframe.entity.ApplicationConfig;
import org.xtframe.entity.User;

/**
 * @ClassName: ContextUtil
 * @Description: 全局上下文获取工具
 * @author yong.sun
 * @date 2013-9-15
 */
public class ContextUtil {

	/**
	 * 获取服务器数据
	 * 
	 * @return
	 */
	public static Application getApplication() {
		return Application.getInstance();
	}

	/**
	 * 获取当前用户数据
	 * 
	 * @return
	 */
	public static User getCurrentUser() {
		Object user = ServletActionContext.getRequest().getSession().getAttribute(ApplicationConfig.LOGIN_USER);
		if (user == null)
			return null;
		else
			return (User) user;
	}

}
