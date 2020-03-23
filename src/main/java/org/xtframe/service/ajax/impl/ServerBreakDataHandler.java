package org.xtframe.service.ajax.impl;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.xtframe.common.json.JSON2Java;
import org.xtframe.entity.Application;
import org.xtframe.entity.User;
import org.xtframe.service.ajax.AjaxDataHandlerException;
import org.xtframe.service.ajax.IAjaxDataHandler;
import org.xtframe.service.ajax.AjaxDataHandlerException.AjaxExceptionType;
import org.xtframe.util.ApplicationConfigUtil;
import org.xtframe.util.CommonUtil;
import org.xtframe.util.ContextUtil;
import org.xtframe.util.OsCacheUtil;
import org.xtframe.util.StringUtil;

/**
 * @ClassName: ServerBreakDataHandler 
 * @Description: 服务器刷新
 * @author yong.sun
 * @date 2013-9-23
 */
@Service
@Scope("prototype")
public class ServerBreakDataHandler implements IAjaxDataHandler {
	private final Log logger = LogFactory.getLog(getClass());

	public Map<String, Object> execute(String strData) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			User user = ContextUtil.getCurrentUser();
			if(user == null){
				map.put(STATUS, false);
				map.put(LOGIN, true);
				throw new AjaxDataHandlerException("未登陆执行服务器刷新操作", AjaxExceptionType.login_again);
			}
			Application application = ContextUtil.getApplication();
			
			Map<String, Object> objJson = JSON2Java.optMap(CommonUtil.getJavaObject(strData));
			if(!user.getUserInfo().getUserName().equals(ApplicationConfigUtil.getApplicationConfig().getConfig("superAdmin"))){
				map.put(STATUS, false);
				map.put(LOGIN, false);
				throw new AjaxDataHandlerException("不具有服务器刷新的权限", AjaxExceptionType.login_again);
			}
			
			String type = StringUtil.toString(objJson.get("type"), "");
			if(StringUtil.isNullStr(type)) throw new AjaxDataHandlerException("没指明刷新对象的服务器刷新");
			if(type.equals("server")){
				map.put(STATUS, application.initAll());
			}
			else if(type.equals("role")){
				map.put(STATUS, application.initRole());
			}
			else if(type.equals("sql")){
				map.put(STATUS, application.initSQL());
			}
			else if(type.equals("menu")){
				map.put(STATUS, application.initMenu());
			}
			else if(type.equals("logic")){
				map.put(STATUS, application.initLogic());
			}
			else if(type.equals("res")){
				map.put(STATUS, application.initResources());
			}
			else if(type.equals("dictionary")){
				map.put(STATUS, application.initDictionary());
			}
			else if(type.equals("systemdata")){
				map.put(STATUS, application.initSystemParameter());
			}
			else if(type.equals("database")){
				map.put(STATUS, application.initDataBase());
			}
			else if(type.equals("webpages")){
				map.put(STATUS, application.initWebPages());
			}
			else if(type.equals("oscache")){
				OsCacheUtil.flushAll();
				map.put(STATUS, true);
			}
		} catch(AjaxDataHandlerException ex){
			logger.warn(ex.toString());
			if(ex.getFlag() == AjaxExceptionType.general){
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
