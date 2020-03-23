package org.xtframe.filter;

import javax.servlet.Filter;
import javax.servlet.FilterConfig;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Iterator;
import java.util.Set;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Component;
import org.xtframe.entity.ApplicationConfig;
import org.xtframe.entity.Resources;
import org.xtframe.entity.User;
import org.xtframe.util.ApplicationConfigUtil;

/**
 * @ClassName: SecurityFilter 
 * @Description: 资源保护过滤器
 * @author yong.sun
 * @date 2013-9-21
 */
@Component
public class SecurityFilter implements Filter {

	private Log logger = LogFactory.getLog(this.getClass());

	// 登陆页面
	private String loginPageUri;
	// 受限资源
	private Set<Resources> restrictedResources;

	/**
	 * 初始化过滤器
	 */
	public void init(FilterConfig filterConfig) throws ServletException {
		loginPageUri = ApplicationConfigUtil.getApplicationConfig().getConfig("loginPageUri");
	}

	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
		this.logger.debug(" doFilter ");

		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) res;

		String contextPath = request.getContextPath();
		String requestUri = request.getRequestURI();

		this.logger.debug(" contextPath =  " + contextPath);
		this.logger.debug(" requestUri =  " + requestUri);
//		System.out.println(" contextPath =  " + contextPath);
//		System.out.println(" requestUri =  " + requestUri);

		Resources restrictedResource = this.contains(requestUri, contextPath);
		// 忽略没有登记授权的页面
		if (restrictedResource == null) {
			chain.doFilter(request, response);
			return;
		}

		// 检查是否登陆用户
		if (!isLogin(request)) {
			response.sendRedirect(loginPageUri);
			return;
		}

		User user = getLoninUser(request);

		// 验证是否有权限
		if (!user.isInRes(restrictedResource.getResId())) {
			response.setStatus(404);
			return;
		}

		chain.doFilter(req, res);
	}

	public void destroy() {
	}

	private Resources contains(String value, String contextPath) {
		value = value.toLowerCase();
		String uri;
		Iterator<Resources> ite = this.restrictedResources.iterator();
		while (ite.hasNext()) {
			Resources restrictedResource = ite.next();
//			if ((contextPath + restrictedResource.getUri()).equalsIgnoreCase(value)) {
//				return restrictedResource;
//			}
			uri = (contextPath + restrictedResource.getUri()).toLowerCase();
			if (value.indexOf(uri) == 0) {
				return restrictedResource;
			}
		}
		return null;
	}

	private User getLoninUser(HttpServletRequest request) {
		return (User) request.getSession().getAttribute(ApplicationConfig.LOGIN_USER);
	}

	private boolean isLogin(HttpServletRequest request) {
		User user = (User) request.getSession().getAttribute(ApplicationConfig.LOGIN_USER);
		return user != null;
	}

	public Set<Resources> getRestrictedResources() {
		return restrictedResources;
	}

	public void setRestrictedResources(Set<Resources> restrictedResources) {
		this.restrictedResources = restrictedResources;
	}
}
