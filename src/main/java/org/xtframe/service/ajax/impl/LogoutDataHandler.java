package org.xtframe.service.ajax.impl;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.ServletActionContext;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.xtframe.entity.ApplicationConfig;
import org.xtframe.service.ajax.IAjaxDataHandler;

/**
 * @ClassName: LogoutDataHandler 
 * @Description: 登出数据处理
 * @author yong.sun
 * @date 2013-9-21
 */
@Service
@Scope("prototype")
public class LogoutDataHandler implements IAjaxDataHandler {
	private final Log logger = LogFactory.getLog(getClass());

	public Map<String, Object> execute(String strData) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			HttpSession session = ServletActionContext.getRequest().getSession();
			session.removeAttribute(ApplicationConfig.LOGIN_USER);
			session.invalidate();
			map.put(STATUS, true);
		} catch (Exception e) {
			logger.error(e.toString());
			map.clear();
			map.put(STATUS, false);
		}
		
		return map;
	}
}
