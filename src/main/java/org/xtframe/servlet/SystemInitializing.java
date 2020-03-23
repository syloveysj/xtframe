package org.xtframe.servlet;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.xtframe.entity.Application;
import org.xtframe.entity.ApplicationConfig;

/**
 * @ClassName: SystemInitializing
 * @Description: 系统启动初始化servlet
 * @author yong.sun
 * @date 2013-9-15
 */
public class SystemInitializing extends HttpServlet {

	private static final long serialVersionUID = -186278965583002371L;
	private final Log logger = LogFactory.getLog(getClass());

	public void destroy() {
		super.destroy();
	}

	public void init() throws ServletException {
		Application application = Application.getInstance();
		if (application.initAll()) {
			ServletContext context = this.getServletContext();
			context.removeAttribute(ApplicationConfig.SERVER_DATA);
			context.setAttribute(ApplicationConfig.SERVER_DATA, application);
			logger.info("xtFrame系统初始化成功！");
		} else {
			logger.info("xtFrame系统初始化失败！");
		}
	}
}
