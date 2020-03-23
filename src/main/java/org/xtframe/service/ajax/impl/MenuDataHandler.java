package org.xtframe.service.ajax.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.xtframe.entity.Application;
import org.xtframe.entity.Menu;
import org.xtframe.entity.User;
import org.xtframe.service.ajax.AjaxDataHandlerException;
import org.xtframe.service.ajax.IAjaxDataHandler;
import org.xtframe.service.ajax.AjaxDataHandlerException.AjaxExceptionType;
import org.xtframe.util.ApplicationConfigUtil;
import org.xtframe.util.ContextUtil;

/**
 * @ClassName: MenuDataHandler 
 * @Description: 菜单数据获取
 * @author yong.sun
 * @date 2013-9-23
 */
@Service
@Scope("prototype")
public class MenuDataHandler implements IAjaxDataHandler {
	private final Log logger = LogFactory.getLog(getClass());

	public Map<String, Object> execute(String strData) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			User user = ContextUtil.getCurrentUser();
			if (user == null) {
				map.put(STATUS, false);
				map.put(LOGIN, true);
				throw new AjaxDataHandlerException("未登陆获取菜单", AjaxExceptionType.login_again);
			}
			Application application = ContextUtil.getApplication();

			ArrayList<Menu> menuList = null;
			if(user.getUserInfo().getUserName().equals(ApplicationConfigUtil.getApplicationConfig().getConfig("superAdmin"))){
				menuList = application.getMenu();
			} else {
				menuList = application.getMenuList(user.getMenuList());
			}
			if (menuList == null) {
				map.put(STATUS, false);
			} else {
				map.put(STATUS, true);
				map.put(ROWS, menuList);
			}
		} catch (AjaxDataHandlerException ex) {
			logger.warn(ex.toString());
			if (ex.getFlag() == AjaxExceptionType.general) {
				map.clear();
				map.put(STATUS, false);
			}
		} catch (Exception e) {
			logger.error(e.toString());
			map.clear();
			map.put(STATUS, false);
		}

		return map;
	}
}
